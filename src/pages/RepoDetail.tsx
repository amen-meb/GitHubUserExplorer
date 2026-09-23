import useGitHubRepo from "../hooks/useGitHubRepo";
import NotFound from "./NotFound";

interface RepoDetailProps {
    username: string;
    repoName: string;
}

export default function RepoDetail({
    username,
    repoName,
}: RepoDetailProps) {

    const {
        repo,
        loading,
        error,
    } = useGitHubRepo(
        username ?? "",
        repoName ?? ""
    );

    function handleBack() {
        window.history.back();
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="mx-auto max-w-4xl">
                    <p className="text-gray-600">
                        Loading repository...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        if (error.toLowerCase().includes("not found")) {
            return (
                <NotFound
                    title="Repository Not Found"
                    message="This repository does not exist or is not publicly available."
                />
            );
        }

        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="mx-auto max-w-4xl">
                    <p className="text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!repo) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto max-w-4xl">
                <button type="button"
                    onClick={handleBack}
                    className="mb-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Back
                </button>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-bold">
                        {repo.name}
                    </h1>

                    {repo.description && (
                        <p className="mt-3 text-gray-600">
                            {repo.description}
                        </p>
                    )}

                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="rounded-lg bg-gray-100 p-4 text-center">
                            <p className="text-sm text-gray-500">
                                Stars
                            </p>

                            <p className="text-xl font-bold">
                                {repo.stargazers_count}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-100 p-4 text-center">
                            <p className="text-sm text-gray-500">
                                Forks
                            </p>

                            <p className="text-xl font-bold">
                                {repo.forks_count}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-100 p-4 text-center">
                            <p className="text-sm text-gray-500">
                                Watchers
                            </p>

                            <p className="text-xl font-bold">
                                {repo.watchers_count}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-100 p-4 text-center">
                            <p className="text-sm text-gray-500">
                                Open Issues
                            </p>

                            <p className="text-xl font-bold">
                                {repo.open_issues_count}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2 flex-row gap-2 text-gray-600">
                        {repo.language && (
                            <p>
                                <strong>Language:</strong>{" "}
                                {repo.language}
                            </p>
                        )}

                        <p>
                            <strong>Created:</strong>{" "}
                            {new Date(
                                repo.created_at
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Updated:</strong>{" "}
                            {new Date(
                                repo.updated_at
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-block rounded-lg bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}