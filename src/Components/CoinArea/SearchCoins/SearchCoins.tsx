import { ChangeEvent } from "react";
import "./SearchCoins.css";
import { useLocation, useNavigate } from "react-router-dom";
import { coinsSlice } from "../../../Redux/CoinsSlice";
import { store } from "../../../Redux/Store";

export function SearchCoins() {
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const searchCoins = (event: ChangeEvent<HTMLInputElement>) => {
        
        // Get the value from the input element
        const value = event.target.value;

        // If the user not in home page - navigate there (to see the search results)
        if(location.pathname !== '/') navigate('/');

        // Update the value in Global State
        const action = coinsSlice.actions.setSearchValue(value);
        store.dispatch(action);

    };
    
    return (
        <div className="SearchCoins">

			<input 
                type="text" 
                id="searchBox" 
                placeholder="Search coins..."
                onChange={searchCoins} />

        </div>
    );
}
