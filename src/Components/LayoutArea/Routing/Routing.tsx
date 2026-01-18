import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../PageArea/Home/Home";
import { Reports } from "../../PageArea/Reports/Reports";
import { AIRecommendations } from "../../PageArea/AIRecommendations/AIRecommendations";
import { About } from "../../PageArea/About/About";

export function Routing() {
    return (
        <div className="Routing">

			<Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/home" element={ <Navigate to="/" /> } />
                <Route path="/reports" element={ <Reports /> } />
                <Route path="/ai-recommendations" element={ <AIRecommendations /> } />
                <Route path="/about" element={ <About /> } />

            </Routes>

        </div>
    );
}
