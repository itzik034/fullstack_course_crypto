import "./Reports.css";
import CanvasJSReact from '@canvasjs/react-charts';
import { useReports } from "../../../Hooks/useReports";
import { chartConfig } from "../../../Utils/ChartConfig";

export function Reports() {
    
    // Create the chart object
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    // Get chart data from a custom hook
    const { symbols, chartData } = useReports();

    // Get chart configuration settings
    const options = chartConfig.getOptions(symbols, chartData);

    return (
        <div className="Reports">

            {/* If the user chose coins - display the chart */}
            {symbols.length > 0 ? (
                <CanvasJSChart options={options} />
            ) : (
                
                // If the user didn't choose any coin - display a message
                <div className="noCoinsMessage">
                    <h3>No coins selected.</h3>
                    <p>Please go to the Home page and select some coins (up to 5).</p>
                </div>
            )}

        </div>
    );
}

