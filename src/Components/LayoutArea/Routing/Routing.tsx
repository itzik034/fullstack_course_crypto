import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../PageArea/Home/Home";
import { Reports } from "../../PageArea/Reports/Reports";

export function Routing() {
    return (
        <div className="Routing">

			<Routes>

                <Route path="/" element={ <Home /> } />
                <Route path="/home" element={ <Navigate to="/" /> } />
                <Route path="/reports" element={ <Reports /> } />

            </Routes>

        </div>
    );
}
