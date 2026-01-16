import axios from "axios";
import { CoinModel } from "../Models/CoinModel";
import { appConfig } from "../Utils/AppConfig";

class CoinService {

    public async getAllCoins(): Promise<CoinModel[]> {
        const response = await axios.get<CoinModel[]>(appConfig.coinsUrlUSD);
        const coins = response.data;
        return coins;
    }

    public async getCoinCurrency(id: string): Promise<CoinModel> {
        const response = await axios.get(appConfig.coinUrl + id);
        const raw = response.data;
        
        const coin = new CoinModel();
        coin.id = raw.id;
        coin.symbol = raw.symbol;
        coin.name = raw.name;
        coin.image = raw.image;

        if(raw.market_data && raw.market_data.current_price) {
            coin.usd = raw.market_data.current_price.usd;
            coin.eur = raw.market_data.current_price.eur;
            coin.ils = raw.market_data.current_price.ils;
        }

        return coin;
    }

}

export const coinService = new CoinService();
