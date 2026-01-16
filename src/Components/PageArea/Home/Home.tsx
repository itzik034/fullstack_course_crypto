import { useEffect, useState } from "react";
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
                {filteredCoins.map(c => <CoinCard key={c.id} coin={c} />)}
            </div>

        </div>
    );
}
