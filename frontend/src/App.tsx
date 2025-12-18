import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import "./styles/global.css";
import "animate.css";
import MainLayout from "./layout/MainLayout";
import ScoreBoardPage from "./pages/ScoreBoard";
import LoginPage from "./pages/Login";
import JudgePage from "./pages/Judge";
import JudgeBaremPage from "./pages/Judge/Barem";
import ProtectedRoute from "./layout/ProtectedRoute";
import { USER_ROLE } from "./constants/enums";
import SubmissionsPage from "./pages/Submissions";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="scoreboard" element={<ScoreBoardPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="submissions" element={<SubmissionsPage />} />

                    {/* Role Judge */}
                    <Route path="judge" element={<ProtectedRoute roleAccess={[USER_ROLE.JUDGE]} />}>
                        <Route index element={<JudgePage />} />
                        <Route path="barem/:id" element={<JudgeBaremPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
