import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
    return (
        <div className="Menu">

			<NavLink to="/">Home</NavLink>
			<NavLink to="/reports">Reports</NavLink>

        </div>
    );
}
