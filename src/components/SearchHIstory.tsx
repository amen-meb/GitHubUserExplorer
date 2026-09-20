interface SearchHistoryProps {
    history: string[];
    onSelect: (username: string) => void;
    onClear: () => void;
}

export default function SearchHistory({
    history,
    onSelect,
    onClear,
}: SearchHistoryProps) {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Search History
                </h2>

                <button
                    type="button"
                    onClick={onClear}
                    className="text-sm text-red-600 hover:underline"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {history.map((username) => (
                    <button
                        key={username}
                        type="button"
                        onClick={() => onSelect(username)}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
                    >
                        {username}
                    </button>
                ))}
            </div>
        </div>
    );
}