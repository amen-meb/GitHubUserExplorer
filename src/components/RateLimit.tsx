import type { GitHubRateLimit } from "../types/github";

interface RateLimitProps {
    rateLimit: GitHubRateLimit;
}

export default function RateLimit({
    rateLimit,
}: RateLimitProps) {
    const { limit, remaining } = rateLimit.rate;

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 sm:w-64 dark:border-gray-700 dark:bg-slate-800">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-slate-300">
                        API Requests Remaining
                    </p>

                    <p className="text-lg font-bold dark:text-white">
                        {remaining} / {limit}
                    </p>
                </div>

                <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
        </div>
    );
}