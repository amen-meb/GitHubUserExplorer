import { useEffect, useState } from "react";

const STORAGE_KEY = "github-search-history";

export default function useSearchHistory() {
    const [history, setHistory] = useState<string[]>(() => {
        const savedHistory = localStorage.getItem(STORAGE_KEY);

        if (!savedHistory) {
            return [];
        }

        try {
            const parsedHistory: unknown = JSON.parse(savedHistory);

            if (
                Array.isArray(parsedHistory) &&
                parsedHistory.every(
                    (item): item is string => typeof item === "string"
                )
            ) {
                return parsedHistory;
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
        );
    }, [history]);

    function addToHistory(username: string) {
        setHistory((currentHistory) => {
            const updatedHistory = [
                username,
                ...currentHistory.filter(
                    (item) => item !== username
                ),
            ];

            return updatedHistory.slice(0, 10);
        });
    }

    function clearHistory() {
        setHistory([]);
    }

    return {
        history,
        addToHistory,
        clearHistory,
    };
}

