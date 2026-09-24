interface SearchHistoryProps {
    history: string[];
    onSelect: (username: string) => void;
    onRemove: (username: string) => void;
    onClear: () => void;
}

export default function SearchHistory({
    history,
    onSelect,
    onRemove,
    onClear,
}: SearchHistoryProps) {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Search History
                </h2>

                <button
                    type="button"
                    onClick={onClear}
                    className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {history.map((username) => (
                    <div
                        key={username}
                        className="group relative inline-flex"
                    >
                        <button
                            type="button"
                            onClick={() => onSelect(username)}
                            className="rounded-lg bg-gray-100 px-3 py-2 text-sm leading-none text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                            {username}
                        </button>

                        <button
                            type="button"
                            aria-label={`Remove ${username} from search history`}
                            onClick={(event) => {
                                event.stopPropagation();
                                onRemove(username);
                            }}
                            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[9px] font-bold text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-100 dark:border-slate-600 dark:bg-slate-800 dark:text-red-400"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}