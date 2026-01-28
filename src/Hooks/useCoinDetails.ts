import { useState } from "react";
import { CoinModel } from "../Models/CoinModel";
import { notify } from "../Utils/Notify";
import { coinService } from "../Services/CoinService";

export const useCoinDetails = (coin: CoinModel) => {
    
    // Manage the filliping status
    const [isFlipped, setIsFlipped] = useState(false);

    // The currency data (USD, EUR, NIS)
    const [coinDetails, setCoinDetails] = useState<CoinModel>(coin);

    // A function to flip or un-flip the coin card
    const toggleFlip = async () => {

        if (!isFlipped && !coinDetails.eur) {
            try {
                // Get the coin currencies data (USD, EUR, NIS)
                const coinData = await coinService.getCoinCurrency(coin.id!);
                
                // Save the data to Local State
                setCoinDetails(coinData);
            }
            catch (err) {
                notify.error(err);
            }
        }

        // Set the flipping-status to the opposite of the current status
        setIsFlipped(!isFlipped);

    };

    // Return the relevant data to CoinCard component
    return { isFlipped, coinDetails, toggleFlip };

};