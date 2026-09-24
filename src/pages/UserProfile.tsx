import UserCard from "../components/UserCard";
import NotFound from "./NotFound";
import useGitHubUser from "../hooks/useGitHubUser";

interface UserProfileProps {
	username: string;
}

export default function UserProfile({ username }: UserProfileProps) {
	const { user, loading, error } = useGitHubUser(username);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-slate-950 dark:text-slate-100">
				<p className="text-gray-600 dark:text-slate-300">Loading profile...</p>
			</div>
		);
	}

	if (error?.toLowerCase().includes("not found")) {
		return (
			<NotFound
				title="GitHub User Not Found"
				message="That GitHub username does not exist."
			/>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-slate-950 dark:text-slate-100">
				<p className="text-red-600 dark:text-red-400">{error}</p>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-100 p-4 dark:bg-slate-950">
			<div className="mx-auto max-w-4xl">
				<UserCard user={user} />
			</div>
		</div>
	);
}
