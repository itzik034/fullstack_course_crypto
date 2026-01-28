class ChartConfig {

    // Returns the configuration setting for the chart
    public getOptions(symbols: string[], chartData: Record<string, any>) {

        return {
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
    }

}

export const chartConfig = new ChartConfig();