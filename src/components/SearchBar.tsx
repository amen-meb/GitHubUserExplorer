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
        <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2 sm:w-auto"
        >
            <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[420px]"
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
