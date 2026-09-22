import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [username, setUsername] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            return;
        }

        onSearch(trimmedUsername);
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                className="border border-gray-300 rounded-md py-2 px-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    );
}
