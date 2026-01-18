import { useState } from "react";
import { CoinModel } from "../Models/CoinModel";
import { notify } from "../Utils/Notify";
import { coinService } from "../Services/CoinService";

export const useCoinDetails = (coin: CoinModel) => {
    
    const [isFlipped, setIsFlipped] = useState(false);
    const [coinDetails, setCoinDetails] = useState<CoinModel>(coin);

    const toggleFlip = async () => {

        if (!isFlipped && !coinDetails.eur) {
            try {
                const detailedCoin = await coinService.getCoinCurrency(coin.id!);
                setCoinDetails(detailedCoin);
            }
            catch (err) {
                notify.error(err);
            }
        }

        setIsFlipped(!isFlipped);

    };

    return { isFlipped, coinDetails, toggleFlip };

};