interface SortSelectProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

export default function SortSelect({
    sortBy,
    onSortChange,
}: SortSelectProps) {
    return (
        <div>
            <label
                htmlFor="sort"
                className="mb-2 block text-sm font-semibold"
            >
                Sort by
            </label>

            <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                    onSortChange(event.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2"
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
        </div>
    );
}