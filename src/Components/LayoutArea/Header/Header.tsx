import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import "./Header.css";

export function Header() {
    
    const navigate = useNavigate();
    
    function goHome() {
        navigate("/");
    }
    
    return (
        <div className="Header">

            <div id="logo">
                <img src="./src/assets/img/logo.png" onClick={goHome} />
            </div>

            <aside><Menu /></aside>

            <div className="searchFill">
                <input type="text" id="searchBox" placeholder="Search..." />
            </div>

        </div>
    );
}
