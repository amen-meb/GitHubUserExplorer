import { useCallback, useEffect, useState } from "react";
import type { GitHubRateLimit } from "../types/github";

export default function useGitHubRateLimit() {
    const [rateLimit, setRateLimit] =
        useState<GitHubRateLimit | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [error, setError] =
        useState<string | null>(null);

    const fetchRateLimit = useCallback(async () => {
        try {
            const response = await fetch(
                "https://api.github.com/rate_limit"
            );

            if (!response.ok) {
                setError(
                    "Failed to fetch rate limit"
                );
                return;
            }

            const data: GitHubRateLimit =
                await response.json();

            setRateLimit(data);
        } catch {
            setError(
                "Something went wrong while checking the rate limit."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchRateLimit();
    }, [fetchRateLimit]);

    return {
        rateLimit,
        loading,
        error,
        refetch: fetchRateLimit,
    };
}

