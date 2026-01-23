import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { coinService } from "./CoinService";

class ReportService {
	
    public async getSymbolById(ids: string[]): Promise<string[]> {
        
        let allCoins = store.getState().coins.coins;

        if(allCoins.length === 0) {
            allCoins = await coinService.getAllCoins();
        }
        
        const symbols = ids.map(id => {
            const coin = allCoins.find(c => c.id === id);
            return coin ? coin.symbol : null;
        })
        // Every element in this array after this filtering is a string
        .filter((symbol): symbol is string => !!symbol);

        return symbols;

    }
    
    public async getRealTimePrices(symbols: string[]): Promise<object | null> {

        if(symbols.length === 0) return null;

        if(!Array.isArray(symbols) || symbols.length === 0) return null;
        
        // const apiSymbols = symbols.join(",").toUpperCase();
        const apiLink = appConfig.realTimeReportUrl;
        // const response = await axios.get(apiLink + apiSymbols);
        // Because now to report data is local I removed the apiSymbols
        const response = await axios.get(apiLink);
        const data = response.data;

        return data;

    }

}

export const reportService = new ReportService();
