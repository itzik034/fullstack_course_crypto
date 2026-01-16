import { useEffect, useState } from "react";
import { CoinCard } from "../../CoinArea/CoinCard/CoinCard";
import "./Home.css";
import { CoinModel } from "../../../Models/CoinModel";
import { coinService } from "../../../Services/CoinService";
import { notify } from "../../../Utils/Notify";

export function Home() {

    const [coins, setCoins] = useState<CoinModel[]>([]);

    useEffect(() => {
        coinService.getAllCoins()
            .then(coins => setCoins(coins))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="Home">

            <h1 className="pageTitle">Crypto Currency Market</h1>

            <div className="coinsList">
                {coins.map(c => <CoinCard key={c.id} coin={c} />)}
            </div>

        </div>
    );
}
