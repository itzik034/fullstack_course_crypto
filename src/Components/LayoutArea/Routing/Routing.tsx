import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../PageArea/Home/Home";
import { Reports } from "../../PageArea/Reports/Reports";
import { AIRecommendations } from "../../PageArea/AIRecommendations/AIRecommendations";
import { About } from "../../PageArea/About/About";
import { Error404 } from "../../PageArea/Error404/Error404";

export function Routing() {
    return (
        <div className="Routing">

			<Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/home" element={ <Navigate to="/" /> } /> {/* Navigate to root as home page */}
                <Route path="/reports" element={ <Reports /> } />
                <Route path="/ai-recommendations" element={ <AIRecommendations /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/*" element={ <Error404 /> } /> {/* If the user typed the wrong address (that we didn't set as a legal address in this component) - display "404 Error" element */}

            </Routes>

        </div>
    );
}
