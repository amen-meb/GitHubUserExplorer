import { FaGithub } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-slate-900/85">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                    <FaGithub
                        size={30}
                        className="text-gray-900 dark:text-white"
                    />

                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        GitHub Explorer
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? (
                        <Moon size={22} />
                    ) : (
                        <Sun size={22} />
                    )}
                </button>
            </div>
        </header>
    );
}