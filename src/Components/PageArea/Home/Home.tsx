import { useCallback, useEffect, useState } from "react";
import { CoinCard } from "../../CoinArea/CoinCard/CoinCard";
import "./Home.css";
import { CoinModel } from "../../../Models/CoinModel";
import { coinService } from "../../../Services/CoinService";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

export function Home() {

    const [coins, setCoins] = useState<CoinModel[]>([]);
    const searchText = useSelector<AppState, string>(state => state.coins.searchText);

    // Save the active switches list to the Local State
    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem("coinsSwitches");
        return saved ? JSON.parse(saved) : [];
    });

    // Function to re-render the active switches list
    // We're using useCallBack to make sure the function created only once
    const renderSelected = useCallback(() => {
        const saved = localStorage.getItem("coinsSwitches");
        setSelectedIds(saved ? JSON.parse(saved) : []);
    }, []);

    // Load the coins list to Local State once - when app loaded
    useEffect(() => {
        coinService.getAllCoins()
            .then(coins => setCoins(coins))
            .catch(err => notify.error(err));
    }, []);

    // Used to display search results. 
    // Displays all of the coins if the user din't search anything
    const filteredCoins = coins.filter(c => 
        
        // The user can search coins by name or symbol and it isn't case sensitive - 
        // cause we convert his search and the coin's name and symbol to lower case.
        c.name?.toLowerCase().includes(searchText.toLowerCase()) || 
        c.symbol?.toLowerCase().includes(searchText.toLowerCase())

    );

    return (
        <div className="Home">

            <h1 className="pageTitle">
                {searchText ? `Search results for "${searchText}"` : "Crypto Currencies"}
            </h1>

            <div className="coinsList">
                {filteredCoins.map(c => 
                    <CoinCard 
                        key={c.id} 
                        coin={c} 
                        isSelected={selectedIds.includes(c.id!)} 
                        onRender={renderSelected} 
                    />)}
            </div>

        </div>
    );
}
