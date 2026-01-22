import { useEffect, useState } from "react";
import "./Reports.css";
import CanvasJSReact from '@canvasjs/react-charts';
import { reportService } from "../../../Services/ReportService";
import { notify } from "../../../Utils/Notify";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type DataPoint = {
    x: Date;
    y: number;
};

type ChartData = {
    [key: string]: DataPoint[];
};

type CoinPriceResponse = {
    USD: number;
};

export function Reports() {

    const [chartData, setChartData] = useState<ChartData>({});
    const [symbols, setSymbols] = useState<string[]>([]);

    useEffect(() => {

        const storageCoins = localStorage.getItem("coinsSwitches");
        console.log(storageCoins);


        if (storageCoins) {
            const symbolsArray = JSON.parse(storageCoins);
            setSymbols(symbolsArray);
        }

    }, []);

    useEffect(() => {

        if (symbols.length === 0) return;

        const interval = setInterval(async () => {

            try {
                const prices = await reportService.getRealTimePrices(symbols) as Record<string, CoinPriceResponse>;
                console.log(prices);                

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

    const options = {
        title: {
            text: "Real-time Crypto Prices in USD"
        },
        axisX: {
            title: "Time",
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "Price in USD",
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center"
        },

        data: symbols.map(symbol => ({
            type: "line",
            name: symbol.toUpperCase(),
            showInLegend: true,
            xValueFormatString: "HH:mm:ss",
            dataPoints: chartData[symbol.toUpperCase()] || []
        }))
    };

    return (
        <div className="Reports">

            {symbols.length > 0 ? (
                <CanvasJSChart options={options} />
            ) : (
                <div className="noCoinsMessage">
                    <h3>No coins selected.</h3>
                    <p>Please go to the Home page and select some coins (up to 5).</p>
                </div>)}

        </div>
    );
}
