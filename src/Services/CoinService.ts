import axios from "axios";
import { CoinModel } from "../Models/CoinModel";
import { appConfig } from "../Utils/AppConfig";
import { coinsSlice } from "../Redux/CoinsSlice";
import { store } from "../Redux/Store";

class CoinService {

    public async getAllCoins(): Promise<CoinModel[]> {

        // If there's already coins in Global State - load it from there
        if (store.getState().coins.length > 0) {
            return store.getState().coins;
        }

        // Ask the coins list from the server
        const response = await axios.get<CoinModel[]>(appConfig.coinsUrlUSD);
        
        // Extract the data from the server response
        const coins = response.data;

        // Save the data to Global State
        const action = coinsSlice.actions.initCoins(coins);
        store.dispatch(action);

        // Return the data
        return coins;

    }

    public async getCoinCurrency(id: string): Promise<CoinModel> {

        // Get the coins array from Global State
        const coins = store.getState().coins;

        // Try to find the index of the current coin
        const index = coins.findIndex(c => c.id === id);

        // If found, and currencies are already been set - return the coin
        if (index !== -1 && coins[index].eur !== undefined) {
            return coins[index];
        }

        // Ask the server for data about current coin
        const response = await axios.get(appConfig.coinUrl + id);
        const raw = response.data;

        // Create a new CoinModel for adding currencies values to it
        const coin = new CoinModel();
        coin.id = raw.id;
        coin.symbol = raw.symbol;
        coin.name = raw.name;
        coin.image = raw.image;

        // Add the currencies values
        if (raw.market_data && raw.market_data.current_price) {
            coin.usd = raw.market_data.current_price.usd;
            coin.eur = raw.market_data.current_price.eur;
            coin.ils = raw.market_data.current_price.ils;
        }

        // Save the coin new data to Global State
        const action = coinsSlice.actions.updateCoin(coin);
        store.dispatch(action);

        // Return the coin with the new data
        return coin;

    }

}

export const coinService = new CoinService();
