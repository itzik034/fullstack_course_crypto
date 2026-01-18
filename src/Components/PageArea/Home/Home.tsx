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

    useEffect(() => {
        coinService.getAllCoins()
            .then(coins => setCoins(coins))
            .catch(err => notify.error(err));
    }, []);

    const filteredCoins = coins.filter(c => 
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
