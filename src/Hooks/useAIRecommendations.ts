import { useEffect, useState } from "react";
import { coinService } from "../Services/CoinService";
import { CoinModel } from "../Models/CoinModel";
import { gptService } from "../Services/GptService";

export function useAIRecommendations() {
    
    // User's saved coins list
    const [coins, setCoins] = useState<string[]>([]);

    // All coins list
    const [allCoins, setAllCoins] = useState<CoinModel[]>([]);

    // Manage recommendations and loading status
    const [recommendations, setRecommendations] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    useEffect(() => {
        
        /* Run inside a async function to allow it load the all coins list 
        *  from server if not loaded in Global State yet 
        * (if the user refresh the page or something) 
        */
        const initData = async () => {
            
            // Get the all coins list and save them in Local State
            const coinsData = await coinService.getAllCoins();
            setAllCoins(coinsData);

            // Get the user's saved coins and save them in Local State
            const savedIds = coinService.getSavedCoinIds();
            setCoins(savedIds);

        };
        initData();
    }, []);

    const askForRecommendation = async (coinId: string) => {
        
        // Display the loading spinner
        setLoading(prev => ({ ...prev, [coinId]: true }));

        // Get the specific coin object
        const coin = allCoins.find(c => c.id === coinId);
        
        // Get currency data (USD, EUR, NIS)
        const coinData = await coinService.getCoinData(coinId);

        // If coin found
        if (coin) {
            // Ask for AI recommendation
            const result = await gptService.getAIRecommendation(coin.name!, coinData);
            
            // If there's response save it to Local State
            if (result) {
                setRecommendations(prev => ({ ...prev, [coinId]: result }));
            }
        }

        // Remove the loading spinner
        setLoading(prev => ({ ...prev, [coinId]: false }));
        
    };

    // Return the relevant data to "AIRecommendation" component
    return {
        coins,
        allCoins,
        recommendations,
        loading,
        askForRecommendation
    };
}