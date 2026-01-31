import axios from "axios";
import { CoinModel } from "../Models/CoinModel";
import { appConfig } from "../Utils/AppConfig";
import { coinsSlice } from "../Redux/CoinsSlice";
import { store } from "../Redux/Store";
import { CoinDataModel } from "../Models/CoinDataModel";

class CoinService {

    public async getAllCoins(): Promise<CoinModel[]> {

        // If there's already coins in Global State - load it from there
        if (store.getState().coins.coins.length > 0) {
            return store.getState().coins.coins;
        }


        // Ask the coins list from the server
        const response = await axios.get(appConfig.coinsUrlUSD);

        // Extract the data from the server response
        let coins = response.data;

        // If the data is an object (Firebase style) instead of an array, convert it
        if (coins && !Array.isArray(coins) && typeof coins === 'object') {
            coins = Object.values(coins);
        }

        // Save the data to Global State
        const action = coinsSlice.actions.initCoins(coins);
        store.dispatch(action);

        // Return the data
        return coins;

    }

    public async getCoinCurrency(id: string): Promise<CoinModel> {

        // Get the coins array from Global State
        const coins = store.getState().coins.coins;

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
        coin.image = raw.image.large;

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

    public async getCoinData(coinId: string): Promise<CoinDataModel> {

        // Ask the server for data about current coin
        const response = await axios.get(appConfig.coinUrl + coinId);
        const data = response.data;

        // Create a new CoinData
        const coinData = new CoinDataModel();

        // Get the relevant data from server
        coinData.name = data.name;
        coinData.current_price_usd = data.market_data.current_price.usd;
        coinData.market_cap_usd = data.market_data.market_cap.usd;
        coinData.volume_24h_usd = data.tickers[1].converted_volume.usd;
        coinData.price_change_percentage_30d_in_currency = data.market_data.price_change_percentage_30d_in_currency.usd;
        coinData.price_change_percentage_60d_in_currency = data.market_data.price_change_percentage_60d_in_currency.usd;
        coinData.price_change_percentage_200d_in_currency = data.market_data.price_change_percentage_200d_in_currency.usd;

        return coinData;
    }

    public getSavedCoinIds(): string[] {

        // Get the saved coins list from localStorage
        const savedCoins = localStorage.getItem("coinsSwitches");

        // If there's a list return it as array, or return empty array if not
        return savedCoins ? JSON.parse(savedCoins) : [];

    }

}

export const coinService = new CoinService();
