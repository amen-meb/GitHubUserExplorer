import type { GitHubRepository } from "../types/github";

interface RepoCardProps {
    repo: GitHubRepository;
    username: string;
}

export default function RepoCard({ repo, username }: RepoCardProps) {
    function handleOpenRepo(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const nextPath = `/repo/${username}/${repo.name}`;
        window.history.pushState({}, "", nextPath);
        window.dispatchEvent(new PopStateEvent("popstate"));
    }

    return (
        <a
            href={`/repo/${username}/${repo.name}`}
            onClick={handleOpenRepo}
            className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
        >
            <h3 className="text-xl font-semibold text-gray-900">
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
        </a>
    );
}