import { useEffect, useState } from "react";
import { reportService } from "../Services/ReportService";
import { notify } from "../Utils/Notify";

export type DataPoint = {
    x: Date;
    y: number;
};

export type ChartData = {
    [key: string]: DataPoint[];
};

type CoinPriceResponse = {
    USD: number;
};

export function useReports() {
    const [chartData, setChartData] = useState<ChartData>({});
    const [symbols, setSymbols] = useState<string[]>([]);

    useEffect(() => {
        const storageCoins = localStorage.getItem("coinsSwitches");

        if (storageCoins) {
            // Convert to an array
            const idsArray = JSON.parse(storageCoins);

            // Run inside a async function - to load coins from server if not loaded in the Global State
            const getSymbols = async () => {
                const symbolsArray = await reportService.getSymbolById(idsArray);
                setSymbols(symbolsArray);
            }
            getSymbols();
        }
    }, []);

    useEffect(() => {
        if (symbols.length === 0) return;

        const interval = setInterval(async () => {
            try {
                const prices = await reportService.getRealTimePrices(symbols) as Record<string, CoinPriceResponse>;

                if (prices) {
                    const now = new Date();

                    setChartData(prevData => {
                        const newData = { ...prevData };

                        symbols.forEach(smbl => {
                            const symbol = smbl.toUpperCase();

                            if (prices[symbol]) {
                                const currentPrice = prices[symbol].USD;

                                if (!newData[symbol]) newData[symbol] = [];

                                newData[symbol].push({ x: now, y: currentPrice });

                                if (newData[symbol].length > 20) newData[symbol].shift();
                            }
                        });

                        return newData;
                    });
                }
            }
            catch (err) {
                notify.error(err);
            }
        }, 1000);

        return () => clearInterval(interval);

    }, [symbols]);

    return { symbols, chartData };
}
