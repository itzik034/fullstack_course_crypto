import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
    return (
        <div className="Menu">

			<NavLink to="/">Home</NavLink>
			<NavLink to="/reports">Reports</NavLink>
			<NavLink to="/ai-recommendations">AI Recommendations</NavLink>
			<NavLink to="/about">About</NavLink>

        </div>
    );
}
