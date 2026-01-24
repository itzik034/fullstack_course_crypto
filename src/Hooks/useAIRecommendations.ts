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
        
        setLoading(prev => ({ ...prev, [coinId]: true }));

        const coin = allCoins.find(c => c.id === coinId);
        const coinData = await coinService.getCoinData(coinId);

        if (coin) {
            const result = await gptService.getAIRecommendation(coin.name ?? coinId, coinData);
            if (result) {
                setRecommendations(prev => ({ ...prev, [coinId]: result }));
            }
        }

        setLoading(prev => ({ ...prev, [coinId]: false }));
        
    };

    return {
        coins,
        allCoins,
        recommendations,
        loading,
        askForRecommendation
    };
}