import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useGitHubUser from "../hooks/useGitHubUser";
import UserCard from "../components/UserCard";

export default function SearchPage() {
    const [username, setUsername] = useState<string>("");
    const { user, loading, error } = useGitHubUser(username);

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
                <UserCard user={user} />
            )}
        </div>
    );
}