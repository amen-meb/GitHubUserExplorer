import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useGitHubUser from "../hooks/useGitHubUser";

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
                <div className="mt-8 rounded-lg border border-gray-300 bg-white p-6">
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="mb-4 h-24 w-24 rounded-full"
                    />

                    <h2 className="text-2xl font-bold">
                        {user.login}
                    </h2>

                    {user.bio && (
                        <p className="mt-2 text-gray-600">
                            {user.bio}
                        </p>
                    )}

                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <p>
                            <strong>Followers</strong>{" "}
                            {user.followers}
                        </p>

                        <p>
                            <strong>Following</strong>{" "}
                            {user.following}
                        </p>

                        <p>
                            <strong>Public Repos</strong>{" "}
                            {user.public_repos}
                        </p>

                        {user.location && (
                            <p className="col-span-3 mt-2 text-gray-600">
                                <strong>Location:</strong>{" "}
                                {user.location}
                            </p>
                        )}

                        {user.company && (
                            <p className="col-span-3 mt-2 text-gray-600">
                                <strong>Company:</strong>{" "}
                                {user.company}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}