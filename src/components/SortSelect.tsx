interface SortSelectProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

export default function SortSelect({
    sortBy,
    onSortChange,
}: SortSelectProps) {
    return (
        <div className="w-full sm:w-[48%]">
            <label
                htmlFor="sort"
                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-slate-200"
            >
                Sort by
            </label>

            <div className="relative">
                <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) =>
                        onSortChange(event.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-base text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-slate-800 dark:text-slate-100"
                >
                    <option value="stars">
                        Stars
                    </option>

                    <option value="forks">
                        Forks
                    </option>

                    <option value="updated">
                        Recently Updated
                    </option>

                    <option value="name">
                        Name
                    </option>
                </select>

                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-slate-400">
                    ▾
                </span>
            </div>
        </div>
    );
}