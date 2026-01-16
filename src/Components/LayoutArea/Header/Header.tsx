import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import "./Header.css";
import { SearchCoins } from "../../CoinArea/SearchCoins/SearchCoins";

export function Header() {
    
    const navigate = useNavigate();
    
    function goHome() {
        navigate("/");
    }
    
    return (
        <div className="Header">

            <div id="logo">
                <img src="/logo.png" onClick={goHome} />
            </div>

            <aside><Menu /></aside>

            <div className="searchFill">
                <SearchCoins />
            </div>

        </div>
    );
}
