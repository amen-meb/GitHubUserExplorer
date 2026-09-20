import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import useGitHubUser from "../hooks/useGitHubUser";
import useGitHubRepos from "../hooks/useGitHubRepos";
import SortSelect from "../components/SortSelect";

export default function SearchPage() {
    const [username, setUsername] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("stars");

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
    }

    const sortedRepos = [...repos].sort((a, b) => {
        if (sortBy === "stars") {
            return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === "forks") {
            return b.forks_count - a.forks_count;
        }
        if (sortBy === "updated") {
            return (
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
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
                        {sortedRepos.length > 0 && (
                            <div className="mt-8">
                                <SortSelect sortBy={sortBy} onSortChange={setSortBy} />
                            </div>
                        )}

                        <RepoList repos={sortedRepos} />
                    </>
                    
                )}
            </div>
        </div>
    );
}