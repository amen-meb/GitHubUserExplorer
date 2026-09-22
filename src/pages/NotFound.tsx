import { Link } from "react-router-dom";

interface NotFoundProps {
    title?: string;
    message?: string;
    onBack?: () => void;
}

export default function NotFound({
    title = "Page Not Found",
    message = "The page you are looking for does not exist.",
    onBack,
}: NotFoundProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold">
                    {title}
                </h2>

                <p className="mt-2 text-gray-600">
                    {message}
                </p>

                {onBack ? (
                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-6 rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700"
                    >
                        Back to Search
                    </button>
                ) : (
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700"
                    >
                        Back to Search
                    </Link>
                )}
            </div>
        </div>
    );
}