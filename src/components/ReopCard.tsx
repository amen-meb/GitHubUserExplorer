import type { GitHubRepository } from "../types/github";
import { useNavigate } from "react-router-dom";
import { Clock, ExternalLink, GitFork, Star } from "lucide-react";

interface RepoCardProps {
    repo: GitHubRepository;
    username: string;
}

export default function RepoCard({ repo, username }: RepoCardProps) {
    const navigate = useNavigate();

    function handleOpenRepo(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        window.history.replaceState(
            {
                ...window.history.state,
                returnRepo: repo.name,
            },
            "",
            "/"
        );
        navigate(`/repo/${username}/${repo.name}`);
    }

    return (
        <a
            id={`repo-card-${encodeURIComponent(repo.name)}`}
            href={`/repo/${username}/${repo.name}`}
            onClick={handleOpenRepo}
            className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"        
            >

            <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-gray-900">
                    {repo.name}
                </h3>
                
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="shrink-0 text-gray-500 transition-colors hover:text-blue-700"
                    aria-label={`Open ${repo.name} on GitHub`}
                >
                    <ExternalLink size={18} />
                </a>
            </div>

            {repo.description && (
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {repo.description}
                </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{repo.stargazers_count}</span>
                </div>

                <div className="h-4 w-px bg-gray-200" />

                <div className="flex items-center gap-1.5">
                    <GitFork size={16} />
                    <span>{repo.forks_count}</span>
                </div>

                {repo.language && (
                    <>
                        <div className="h-4 w-px bg-gray-200" />

                        <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            {repo.language}
                        </span>
                    </>
                )}
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />

                <span>
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </span>
            </div>

        </a>
    );
}