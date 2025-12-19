import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Candidate";
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
import ActivePage from "./pages/Active";
import MentorPage from "./pages/Mentor";
import IndexPage from "./pages/Home";
import MentorBaremPage from "./pages/Mentor/Barem";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="scoreboard" element={<ScoreBoardPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="active/token/:token" element={<ActivePage />} />
                    <Route path="submissions" element={<SubmissionsPage />} />

                    {/* Role Judge */}
                    <Route path="judge" element={<ProtectedRoute roleAccess={[USER_ROLE.JUDGE]} />}>
                        <Route index element={<JudgePage />} />
                        <Route path="barem/:id" element={<JudgeBaremPage />} />
                    </Route>

                    {/* Role Mentor */}
                    <Route path="mentor" element={<ProtectedRoute roleAccess={[USER_ROLE.MENTOR]} />}>
                        <Route index element={<MentorPage />} />
                        <Route path="barem/:id" element={<MentorBaremPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
