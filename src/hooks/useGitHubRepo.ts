import { useEffect, useState } from "react";
import type { GitHubRepositoryDetail } from "../types/github";

function useGitHubRepo(
    username: string,
    repoName: string
) {
    const [repo, setRepo] =
        useState<GitHubRepositoryDetail | null>(null);

    const [loading, setLoading] =
        useState<boolean>(false);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        if (!username || !repoName) {
            return;
        }

        async function fetchRepo() {
            setLoading(true);
            setError(null);
            setRepo(null);

            try {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repoName}`
                );

                if (response.status === 404) {
                    setError("Repository not found");
                    return;
                }

                if (!response.ok) {
                    setError(
                        "Failed to fetch repository"
                    );
                    return;
                }

                const data: GitHubRepositoryDetail =
                    await response.json();

                setRepo(data);
            } catch {
                setError(
                    "Something went wrong while fetching the repository."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRepo();
    }, [username, repoName]);

    return {
        repo,
        loading,
        error,
    };
}

export default useGitHubRepo;