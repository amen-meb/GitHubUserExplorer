import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useGitHubUser from "../hooks/useGitHubUser";
import UserCard from "../components/UserCard";
import useGitHubRepos from "../hooks/useGitHubRepos";

export default function SearchPage() {
    const [username, setUsername] = useState<string>("");
    const { user, loading, error } = useGitHubUser(username);
    const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(username);

    function handleSearch(newUsername: string) {
        setUsername(newUsername);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
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

            {user && (
                <>
                    <UserCard user={user} />
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
                    {repos.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">Repositories</h2>
                            <ul className="list-disc pl-5">
                                {repos.map((repo) => (
                                    <li key={repo.name}
                                        className="rounded-lg bg-white p-4 shadow-sm">
                                            {repo.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}