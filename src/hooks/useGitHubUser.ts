import { useState, useEffect } from "react";
import type { GitHubUser } from "../types/github";        

export default function useGitHubUser(username: string) {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username.trim()) {
            return;
        } 

        async function fetchGitHubData() {
            setLoading(true);
            setError(null);
            setUser(null);

            try {
                const responses = await fetch(`https://api.github.com/users/${username}`);

                if (responses.status === 404) {
                    setError("GitHub User not found");
                    setUser(null);
                    return;
                }

                if (responses.status === 403 || responses.status === 429) {
                    setError(
                        "GitHub API rate limit exceeded. Please try again later."
                    );
                    setUser(null);
                    return;
                }

                if (!responses.ok) {
                    setError(
                        `Failed to fetch GitHub user (${responses.status})`
                    );
                    setUser(null);
                    return;
                }
                const userData: GitHubUser = await responses.json();
                setUser(userData);
            } catch {
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchGitHubData();
    }, [username]);

    return { user, loading, error };
}

