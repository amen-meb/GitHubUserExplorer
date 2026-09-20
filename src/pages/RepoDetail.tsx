import useGitHubRepo from "../hooks/useGitHubRepo";

function getRepoParams() {
    const match = window.location.pathname.match(/^\/repo\/([^/]+)\/([^/]+)$/);

    if (!match) {
        return { username: "", repoName: "" };
    }

    return {
        username: match[1],
        repoName: match[2],
    };
}

export default function RepoDetail() {
    const { username, repoName } = getRepoParams();

    const {
        repo,
        loading,
        error,
    } = useGitHubRepo(username, repoName);

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
                <button
                    type="button"
                    onClick={() => {
                        window.history.pushState({}, "", "/");
                        window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                    className="mb-6 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                    ← Back to search
                </button>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {repo.name}
                        </h1>

                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                        >
                            View on GitHub
                        </a>
                    </div>

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

                    <div className="mt-6 space-y-2 text-gray-600">
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
                        className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}