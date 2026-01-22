import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class ReportService {
	
    public async getRealTimePrices(symbols: string[]): Promise<object | null> {

        if(symbols.length === 0) return null;
        
        const apiSymbols = symbols.join(",").toUpperCase();
        const apiLink = appConfig.realTimeReportUrl;
        const response = await axios.get(apiLink + apiSymbols);
        const data = response.data;

        return data;

    }

}

export const reportService = new ReportService();
