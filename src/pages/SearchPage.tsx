import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import SortSelect from "../components/SortSelect";
import LanguageFilter from "../components/LanguageFilter";
import SearchHistory from "../components/SearchHIstory";
import RateLimit from "../components/RateLimit";
import NotFound from "./NotFound";
import useGitHubRateLimit from "../hooks/useGitHubRateLimit";

import useGitHubUser from "../hooks/useGitHubUser";
import useGitHubRepos from "../hooks/useGitHubRepos";
import useSearchHistory from "../hooks/useSearchHistory";

export default function SearchPage() {
    const [username, setUsername] = useState<string>(() => (
        typeof window.history.state?.username === "string"
            ? window.history.state.username
            : ""
    ));
    const [sortBy, setSortBy] = useState<string>("stars");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");

    const {
        history,
        addToHistory,
        clearHistory,
    } = useSearchHistory();

    const {
        rateLimit,
        loading: rateLimitLoading,
        error: rateLimitError,
    } = useGitHubRateLimit();


    const {
        user,
        loading,
        error,
    } = useGitHubUser(username);

    const {
        repos,
        loading: reposLoading,
        error: reposError,
    } = useGitHubRepos(username);

    useEffect(() => {
        const returnRepo = window.history.state?.returnRepo;

        if (!username || !repos.length || typeof returnRepo !== "string") {
            return;
        }

        const repoCard = document.getElementById(
            `repo-card-${encodeURIComponent(returnRepo)}`
        );

        if (repoCard) {
            repoCard.scrollIntoView({ behavior: "smooth", block: "center" });
            window.history.replaceState(
                { ...window.history.state, returnRepo: undefined },
                "",
                "/"
            );
        }
    }, [repos, username]);

    function handleSearch(newUsername: string) {
        window.history.replaceState(
            { username: newUsername },
            "",
            "/"
        );
        setUsername(newUsername);
        addToHistory(newUsername);
        setSelectedLanguage("");
    }

    const languages = Array.from(
        new Set(
            repos
                .map((repo) => repo.language)
                .filter(
                    (language): language is string =>
                        language !== null
                )
        )
    ).sort();

    const filteredRepos = repos.filter((repo) => {
        if (!selectedLanguage) {
            return true;
        }

        return repo.language === selectedLanguage;
    });

    const sortedRepos = [...filteredRepos].sort((a, b) => {
        if (sortBy === "stars") {
            return b.stargazers_count - a.stargazers_count;
        }

        if (sortBy === "forks") {
            return b.forks_count - a.forks_count;
        }

        if (sortBy === "updated") {
            return (
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            );
        }

        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }

        return 0;
    });

    if (error?.toLowerCase().includes("not found")) {
        return (
            <NotFound
                title="GitHub User Not Found"
                message="That GitHub username does not exist."
                onBack={() => setUsername("")}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-4 text-3xl font-bold">
                    GitHub User Explorer
                </h1>

                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-gray-600">
                        Enter a GitHub username to view the user's
                        profile and repositories.
                    </p>
                </div>
                <div className="mb-6 flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <SearchBar onSearch={handleSearch} />

                    {rateLimit && !rateLimitLoading && !rateLimitError && (
                        <RateLimit rateLimit={rateLimit} />
                    )}
                </div>

                <SearchHistory
                    history={history}
                    onSelect={handleSearch}
                    onClear={clearHistory}
                />

                {(loading || reposLoading) && (
                    <div
                        role="status"
                        className="mt-6 flex w-full items-center justify-center gap-3 text-gray-600"
                    >
                        <span className="size-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" />
                        <span>Loading...</span>
                    </div>
                )}

                {(error || reposError) && (
                    <p className="mt-6 text-red-600">
                        {error ?? reposError}
                    </p>
                )}

                {user && <UserCard user={user} />}

                {user && !reposLoading && !reposError && (
                    <>
                        {repos.length > 0 && (
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <SortSelect
                                    sortBy={sortBy}
                                    onSortChange={setSortBy}
                                />

                                <LanguageFilter
                                    languages={languages}
                                    selectedLanguage={selectedLanguage}
                                    onLanguageChange={
                                        setSelectedLanguage
                                    }
                                />
                            </div>
                        )}

                        <RepoList repos={sortedRepos} username={username} />
                    </>
                )}
            </div>
        </div>
    );
}