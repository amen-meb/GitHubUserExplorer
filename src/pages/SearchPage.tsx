import { useState } from "react";

import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import SortSelect from "../components/SortSelect";
import LanguageFilter from "../components/LanguageFilter";

import useGitHubUser from "../hooks/useGitHubUser";
import useGitHubRepos from "../hooks/useGitHubRepos";

export default function SearchPage() {
    const [username, setUsername] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("stars");
    const [selectedLanguage, setSelectedLanguage] =
        useState<string>("");

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

    function handleSearch(newUsername: string) {
        setUsername(newUsername);
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

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-4 text-3xl font-bold">
                    GitHub User Explorer
                </h1>

                <SearchBar onSearch={handleSearch} />

                {loading && (
                    <p className="mt-6 text-gray-600">
                        Searching...
                    </p>
                )}

                {error && (
                    <p className="mt-6 text-red-600">
                        {error}
                    </p>
                )}

                {user && <UserCard user={user} />}

                {reposLoading && (
                    <p className="mt-6 text-gray-600">
                        Loading repositories...
                    </p>
                )}

                {reposError && (
                    <p className="mt-6 text-red-600">
                        {reposError}
                    </p>
                )}

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

                        <RepoList repos={sortedRepos} />
                    </>
                )}
            </div>
        </div>
    );
}