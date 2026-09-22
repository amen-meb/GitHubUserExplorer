import { useEffect, useState } from "react";

import SearchPage from "./pages/SearchPage";
import RepoDetail from "./pages/RepoDetail";
import NotFound from "./pages/NotFound";

export default function App() {
    const [path, setPath] = useState(() => window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname);
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const repoMatch = path.match(/^\/repo\/([^/]+)\/([^/]+)$/);

    return (
        path === "/" ? <SearchPage /> :
        repoMatch ? (
            <RepoDetail
                username={repoMatch[1]}
                repoName={repoMatch[2]}
            />
        ) : (
            <NotFound />
        )
    );
}