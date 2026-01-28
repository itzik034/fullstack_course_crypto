import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { coinService } from "./CoinService";

class ReportService {
	
    public async getSymbolsById(ids: string[]): Promise<string[]> {
        
        // Try to get the allCoins list from Global State
        let allCoins = store.getState().coins.coins;

        // If the list is empty
        if(allCoins.length === 0) {
            
            // Get the list from a coinService function
            allCoins = await coinService.getAllCoins();

        }
        
        // Extract the coins symbols (found by their ids) for the received ids list
        const symbols = ids.map(id => {
            const coin = allCoins.find(c => c.id === id);
            return coin ? coin.symbol : null;
        })

        // Every element in this array after this filter - is a string (instruction for TypeScript)
        .filter((symbol): symbol is string => !!symbol);

        // Return the symbols list
        return symbols;

    }
    
    public async getRealTimePrices(symbols: string[]): Promise<object | null> {

        // Ensure coins symbols list is an array and not empty
        if(!Array.isArray(symbols) || symbols.length === 0) return null;
        

        // ************************************************
        // Using local data for development, 
        // Production API call is commented out below: 
        // ************************************************

        // const apiSymbols = symbols.join(",").toUpperCase();
        // const apiLink = appConfig.realTimeReportUrl;
        // const response = await axios.get(apiLink + apiSymbols);
        


        // Get the api link
        const apiLink = appConfig.realTimeReportUrl;

        // Send the request to the server
        const response = await axios.get(apiLink);

        // Extract the data
        const data = response.data;

        // Return the data
        return data;

    }

}

export const reportService = new ReportService();
