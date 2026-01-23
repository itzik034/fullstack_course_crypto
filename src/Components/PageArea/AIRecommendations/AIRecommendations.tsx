import { coinService } from "../../../Services/CoinService";
import "./AIRecommendations.css";
import { useEffect, useState } from "react";
import { CoinModel } from "../../../Models/CoinModel";
import { notify } from "../../../Utils/Notify";
import { getAIRecommendation } from "../../../Hooks/useAIRecom";
import { Spinner } from "../../../SharedArea/Spinner/Spinner";

export function AIRecommendations() {

    const [coins, setCoins] = useState<string[]>();
    const [allCoins, setAllCoins] = useState<CoinModel[]>([]);
    const [recommendations, setRecommendations] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const askForRecommendation = async (coinId: string) => {
        setLoading(prev => ({ ...prev, [coinId]: true }));
        const coin = allCoins.find(c => c.id === coinId);
        if (coin) {
            const result = await getAIRecommendation(coin.name ?? coinId);
            if (result) {
                setRecommendations(prev => ({ ...prev, [coinId]: result }));
            }
        }
        setLoading(prev => ({ ...prev, [coinId]: false }));
    };

    useEffect(() => {
        const savedCoins = localStorage.getItem("coinsSwitches");
        if (savedCoins) {
            try { setCoins(JSON.parse(savedCoins)) }
            catch (err) {
                notify.error(err);
                setCoins([]);
            }
        }

        const fetchCoins = async () => {
            const coinsData = await coinService.getAllCoins();
            setAllCoins(coinsData);
        };
        fetchCoins();

    }, []);

    return (
        <div className="AIRecommendations">

            <h2>AI Recommendations</h2>

            <div className="coinsContainer">
                {coins && allCoins.length > 0 && coins.map((coinId: string) => (
                    <div key={coinId} className="coinBox">
                        <div className="coinHeader">
                            <img src={allCoins.find(c => c.id === coinId)?.image} />
                            <h3 className="coinTitle">{allCoins.find(c => c.id === coinId)?.name}</h3>
                            <button className="askBtn" onClick={() => askForRecommendation(coinId)}>Ask For Recommendation</button>
                        </div>
                        {(recommendations[coinId] || loading[coinId]) && (<div className="recommendationBox">
                            {loading[coinId] && (<div className="spinnerContainer"><Spinner /></div>)}
                            {!loading[coinId] && (<p className="recommendationText">{recommendations[coinId]}</p>)}
                        </div>)}
                    </div>
                ))}
            </div>

        </div>
    );
}
