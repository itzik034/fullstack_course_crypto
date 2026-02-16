import { CoinModel } from "../../../Models/CoinModel";
import { Spinner } from "../../../SharedArea/Spinner/Spinner";
import "./CoinRecommendationCard.css";

interface CoinRecommendationCardProps {
    coin: CoinModel;
    recommendation: string | undefined;
    isLoading: boolean;
    onAsk: (coinId: string) => void;
}

export function CoinRecommendationCard(props: CoinRecommendationCardProps) {

    // Get the relevant data from props
    const { coin, recommendation, isLoading, onAsk } = props;

    return (
        <div className="CoinRecommendationCard coinBox">
            <div className="coinHeader">
                <img src={coin.image} alt={coin.name} />
                <h3 className="coinTitle">{coin.name}</h3>
                <button
                    className="askBtn"
                    onClick={() => onAsk(coin.id!)}
                    disabled={isLoading}
                >
                    Ask For AI Recommendation
                </button>
            </div>

            {(recommendation || isLoading) && (
                
                <div className="recommendationBox">

                    {/* Show spinner while loading */}
                    {isLoading && (
                        <div className="spinnerContainer">
                            <Spinner />
                        </div>
                    )}

                    {/* Print recommendation when loading finished */}
                    {!isLoading && recommendation && (
                        <div className="recommendationText"
                            dangerouslySetInnerHTML={{ __html: recommendation }} />
                    )}
                </div>
                
            )}
        </div>
    );
}