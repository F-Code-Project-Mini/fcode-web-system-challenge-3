import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import "./styles/global.css";
import "animate.css";
import MainLayout from "./layout/MainLayout";
import ScoreBoardPage from "./pages/ScoreBoard";
import LoginPage from "./pages/Login";
import JudgePage from "./pages/Judge";
import JudgeBaremPage from "./pages/Judge/Barem";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="scoreboard" element={<ScoreBoardPage />} />
                    <Route path="login" element={<LoginPage />} />

                    {/* Role Judge */}
                    <Route path="judge">
                        <Route index element={<JudgePage />} />
                        <Route path="barem" element={<JudgeBaremPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
