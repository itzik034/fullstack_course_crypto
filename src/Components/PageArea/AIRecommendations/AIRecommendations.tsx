import { coinService } from "../../../Services/CoinService";
import "./AIRecommendations.css";
import { useEffect, useState } from "react";
import { CoinModel } from "../../../Models/CoinModel";
import { notify } from "../../../Utils/Notify";
import { getAIRecommendation } from "../../../Hooks/useAIRecom";
import { Spinner } from "../../../SharedArea/Spinner/Spinner";

export function AIRecommendations() {

    // The user saved coins
    const [coins, setCoins] = useState<string[]>();

    // The all coins list
    const [allCoins, setAllCoins] = useState<CoinModel[]>([]);

    // Manage the asked recommendations and loading status for the UI
    const [recommendations, setRecommendations] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const savedCoins = localStorage.getItem("coinsSwitches");
        if (savedCoins) {
            try { setCoins(JSON.parse(savedCoins)) }
            catch (err) {
                notify.error(err);
                setCoins([]);
            }
        }

        /* Load the coins list. If it's in Global State it will be loaded from there, 
        *  if not - it will be loaded from the server. This is the reason for the async function.
        */
        const fetchCoins = async () => {
            const coinsData = await coinService.getAllCoins();
            setAllCoins(coinsData);
        };
        fetchCoins();

    }, []);

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

    return (
        <div className="AIRecommendations">

            <h2>AI Recommendations</h2>

            <div className="coinsContainer">
                
                {/* If there's saved coins and allCoins list loaded - map the saved coins */}
                {coins && allCoins.length > 0 && coins.map(coinId => (
                    <div key={coinId} className="coinBox">
                        <div className="coinHeader">
                            <img src={allCoins.find(c => c.id === coinId)?.image} />
                            <h3 className="coinTitle">{allCoins.find(c => c.id === coinId)?.name}</h3>
                            <button className="askBtn" onClick={() => askForRecommendation(coinId)}>Ask For AI Recommendation</button>
                        </div>
                        
                        {/* Display the AI recommendation div in the specific element */}
                        {(recommendations[coinId] || loading[coinId]) && (<div className="recommendationBox">
                            
                            {/* Display the loading spinner while loading response from AI */}
                            {loading[coinId] && (<div className="spinnerContainer"><Spinner /></div>)}
                            
                            {/* Display AI recommendation when loading finished */}
                            {!loading[coinId] && recommendations[coinId] && (
                                <div className="recommendationText" dangerouslySetInnerHTML={{ __html: recommendations[coinId] }} />
                            )}
                        </div>)}
                    </div>
                ))}
            </div>

        </div>
    );
}
