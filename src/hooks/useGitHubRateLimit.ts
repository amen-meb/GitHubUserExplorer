import { useEffect, useState } from "react";
import type { GitHubRateLimit } from "../types/github";

export default function useGitHubRateLimit() {
    const [rateLimit, setRateLimit] =
        useState<GitHubRateLimit | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        async function fetchRateLimit() {
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
        }

        fetchRateLimit();
    }, []);

    return {
        rateLimit,
        loading,
        error,
    };
}

