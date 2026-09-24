import {
    BrowserRouter,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import RepoDetail from "./pages/RepoDetail";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<SearchPage />} />

                    <Route
                        path="/user/:username"
                        element={<UserProfileRoute />}
                    />

                    <Route
                        path="/repo/:username/:repoName"
                        element={<RepoDetailRoute />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

function RepoDetailRoute() {
    const { username, repoName } = useParams<{
        username: string;
        repoName: string;
    }>();

    return (
        <RepoDetail
            username={username ?? ""}
            repoName={repoName ?? ""}
        />
    );
}

function UserProfileRoute() {
    const { username } = useParams<{ username: string }>();

    return <UserProfile username={username ?? ""} />;
}