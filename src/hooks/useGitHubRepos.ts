import { useEffect, useState } from "react";
import type { GitHubRepository } from "../types/github";

export default function useGitHubRepos(username: string) {
    const [repos, setRepos] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username.trim()) {
            return;
        }

        async function fetchRepos() {
            setLoading(true);
            setError(null);
            setRepos([]);

            try {
                const response = await fetch(
                    `https://api.github.com/users/${username.trim()}/repos`
                );

                if (response.status === 404) {
                    setError("GitHub user not found");
                    return;
                }

                if (!response.ok) {
                    setError("Failed to fetch repositories");
                    return;
                }

                const data: GitHubRepository[] = await response.json();

                setRepos(data);
            } catch {
                setError(
                    "Something went wrong while fetching repositories."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRepos();
    }, [username]);

    return {
        repos,
        loading,
        error,
    };
}

