import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import "./styles/global.css";
import "animate.css";
import MainLayout from "./layout/MainLayout";
import ScoreBoardPage from "./pages/ScoreBoard";
import LoginPage from "./pages/Login";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="scoreboard" element={<ScoreBoardPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
