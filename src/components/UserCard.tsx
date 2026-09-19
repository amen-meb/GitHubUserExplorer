import type { GitHubUser } from "../types/github";

interface UserCardProps {
    user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="mt-8 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="mb-4 h-24 w-24 rounded-full"
                />

                <h2 className="text-2xl font-bold">
                    {user.login}
                </h2>

                {user.bio && (
                    <p className="mt-2 max-w-xl text-gray-600">
                        {user.bio}
                    </p>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="rounded-lg bg-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Followers
                    </p>

                    <p className="text-xl font-bold">
                        {user.followers}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Following
                    </p>

                    <p className="text-xl font-bold">
                        {user.following}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                        Public Repositories
                    </p>

                    <p className="text-xl font-bold">
                        {user.public_repos}
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-2 text-gray-600">
                {user.location && (
                    <p>
                        <strong>Location:</strong>{" "}
                        {user.location}
                    </p>
                )}

                {user.company && (
                    <p>
                        <strong>Company:</strong>{" "}
                        {user.company}
                    </p>
                )}

                <p>
                    <strong>Joined:</strong>{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}