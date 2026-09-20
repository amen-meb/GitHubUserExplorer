import type { GitHubRepository } from "../types/github";
import RepoCard from "./ReopCard";

interface RepoListProps {
    repos: GitHubRepository[];
}

export default function RepoList({ repos }: RepoListProps) {
    if (repos.length === 0) {
        return (
            <p className="mt-6 text-gray-600">
                No public repositories found.
            </p>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">
                Repositories
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {repos.map((repo) => (
                    <RepoCard
                        key={repo.name}
                        repo={repo}
                    />
                ))}
            </div>
        </div>
    );
}