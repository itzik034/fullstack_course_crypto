import { useEffect, useState } from "react";
import { reportService } from "../Services/ReportService";
import { notify } from "../Utils/Notify";

// Set the format of a point in the chart
export type DataPoint = {
    x: Date;
    y: number;
};

// Set the format of chart data
export type ChartData = {
    [key: string]: DataPoint[];
};

// Set the format of coin price (who received from the server)
type CoinPriceResponse = {
    USD: number;
};

export function useReports() {
    
    // Manage the chart data
    const [chartData, setChartData] = useState<ChartData>({});

    // Manage the coins symbols list
    const [symbols, setSymbols] = useState<string[]>([]);

    useEffect(() => {
        
        // Get the current list of saved coins
        const storageCoins = localStorage.getItem("coinsSwitches");

        // If there's a list
        if (storageCoins) {
            // Convert it to an array
            const idsArray = JSON.parse(storageCoins);

            // Run inside a async function - to load coins from server if not loaded in the Global State
            const getSymbols = async () => {
                const symbolsArray = await reportService.getSymbolsById(idsArray);
                setSymbols(symbolsArray);
            }
            getSymbols();
        }
    }, []);

    useEffect(() => {
        
        // Make sure there's a saved coins list
        if (symbols.length === 0) return;

        // Create a new interval
        const interval = setInterval(async () => {
            try {
                
                // Get the current prices of the coins
                const prices = await reportService.getRealTimePrices(symbols) as Record<string, CoinPriceResponse>;

                // If data is received
                if (prices) {
                    
                    // Get the current date and time
                    const now = new Date();

                    // Save the new data to Local State
                    setChartData(prevData => {
                        
                        // Create a new copy of the data
                        const newData = { ...prevData };

                        // For each coin - run the following commands
                        symbols.forEach(smbl => {
                            
                            // Make sure it's capital letters
                            const coinSymbol = smbl.toUpperCase();

                            // If there's a data about the current coin
                            if (prices[coinSymbol]) {
                                
                                // Get the current price of the coin in USD
                                const currentPrice = prices[coinSymbol].USD;

                                // If there isn't a data about this coin yet (it's a new chart, the page just loaded) - 
                                // create an empty array for it
                                if (!newData[coinSymbol]) newData[coinSymbol] = [];

                                // Add the new data of this coin to it's array
                                newData[coinSymbol].push({ x: now, y: currentPrice });

                                // If there's more than 20 points of this coin in this chart - remove the oldest point
                                if (newData[coinSymbol].length > 20) newData[coinSymbol].shift();
                            }
                        });

                        // Return the new copy of the data to the Local State
                        return newData;
                    });
                }
            }
            catch (err) {
                notify.error(err);
            }
        }, 1000); // Update the chart every 1 second

        // Clear the interval when component goes down
        return () => clearInterval(interval);

    }, [symbols]); // Update when the saved-coins-list updates

    // Return the relevant data to Reports component
    return { symbols, chartData };

}
