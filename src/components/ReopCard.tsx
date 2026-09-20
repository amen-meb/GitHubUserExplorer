import type { GitHubRepository } from "../types/github";

interface RepoCardProps {
    repo: GitHubRepository;
}

export default function RepoCard({ repo }: RepoCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-semibold">
                {repo.name}
            </h3>

            {repo.description && (
                <p className="mt-2 text-gray-600">
                    {repo.description}
                </p>
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                    ⭐ {repo.stargazers_count} stars
                </span>

                <span>
                    🍴 {repo.forks_count} forks
                </span>

                {repo.language && (
                    <span>
                        💻 {repo.language}
                    </span>
                )}
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Updated:{" "}
                {new Date(repo.updated_at).toLocaleDateString()}
            </p>
        </div>
    );
}