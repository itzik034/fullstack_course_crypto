import "./AIRecommendations.css";
import { CoinRecommendationCard } from "../../CoinArea/CoinRecommendationCard/CoinRecommendationCard";
import { useAIRecommendations } from "../../../Hooks/useAIRecommendations";

export function AIRecommendations() {

    // Get the data and logic from a custom hook we built
    const { coins, allCoins, recommendations, loading, askForRecommendation } = useAIRecommendations();

    return (
        <div className="AIRecommendations">

            {/* Page title */}
            <h2>AI Recommendations</h2>

            <div className="coinsContainer">

                {/* If there's saved coins and allCoins list loaded - map the saved coins */}
                {coins && allCoins.length > 0 && coins.map(coinId => {

                    // Find the coin object by the id
                    const coin = allCoins.find(c => c.id === coinId);

                    // Render nothing if there isn't such a coin
                    if (!coin) return null;

                    // Return the recommendation card for the specific coin
                    return (
                        <CoinRecommendationCard
                            key={coinId}
                            coin={coin}
                            recommendation={recommendations[coinId]}
                            isLoading={loading[coinId]}
                            onAsk={askForRecommendation}
                        />
                    );

                })}
                
            </div>

        </div>
    );
}
