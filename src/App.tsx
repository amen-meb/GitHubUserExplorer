import {
    BrowserRouter,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import RepoDetail from "./pages/RepoDetail";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route
                    path="/repo/:username/:repoName"
                    element={<RepoDetailRoute />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function RepoDetailRoute() {
    const { username, repoName } = useParams();

    return (
        <RepoDetail
            username={username ?? ""}
            repoName={repoName ?? ""}
        />
    );
}