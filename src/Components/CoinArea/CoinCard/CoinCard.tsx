import { CoinModel } from "../../../Models/CoinModel";
import "./CoinCard.css";
import { memo } from "react";
import { SwitchLimitDialog } from "../SwitchLimitDialog/SwitchLimitDialog";
import { Button, Switch } from "@mui/material";
import { useCoinSelection } from "../../../Hooks/useCoinSelection";
import { useCoinDetails } from "../../../Hooks/useCoinDetails";

type CoinCardProps = {

    coin: CoinModel;
    isSelected: boolean;
    onRender: () => void;

};

// We're using memo to tell React "Don't re-render this component, unless the props is changed"
// It's done for updating the switch status when "Home" tells us to (Home component is the manager of the switches status list)
export const CoinCard = memo((props: CoinCardProps) => {
    
    // Call to my custom hook who handles the switch changes
    const { dialogOpen, setDialogOpen, handleSwitchChange } = useCoinSelection(props.coin.id!, props.onRender)

    // Calls to my custom hook who handles the card flip
    const { isFlipped, coinDetails, toggleFlip } = useCoinDetails(props.coin);

    return (
        // Add "flipped" class if "isFlipped" === true
        <div className={`CoinCard ${isFlipped ? "flipped" : ""}`}>

            <div className="cardInner">

                <div className="cardFront">
                    <div className="cardContent">
                        <div className="coinIcon"><img src={props.coin.image} /></div>
                        <div className="coinDetails">
                            <span className="coinName" title={props.coin.name}>{props.coin.name}</span>
                            <span className="coinSymbol">{props.coin.symbol}</span>
                        </div>
                        <div className="coinSwitchFill">
                            <Switch
                                color="secondary"
                                className="coinSwitch"
                                checked={props.isSelected}
                                onChange={handleSwitchChange} />
                        </div>
                    </div>

                    <div className="cardButton">
                        <Button onClick={toggleFlip} variant="contained" className="coinButton">More Info</Button>
                    </div>
                </div>

                <div className="cardBack">
                    <h3>Current Price</h3>
                    <div className="backPrices">
                        <p>USD: {coinDetails.usd?.toLocaleString()}$</p>
                        <p>EUR: {coinDetails.eur?.toLocaleString()}€</p>
                        <p>NIS: {coinDetails.ils?.toLocaleString()}₪</p>
                    </div>
                    
                    <Button variant="outlined" className="backButton" onClick={toggleFlip}>Back</Button>
                </div>

            </div>

            {/* If the user choosing more than 5 coins - the hook "useCoinSelection" tell us to display this dialog */}
            <SwitchLimitDialog
                isOpen={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    props.onRender();
                }} />

        </div>
    );
},
    (prevProps, nextProps) => {
        // Re-render only when the coin or the switch status changed
        return prevProps.isSelected === nextProps.isSelected &&
               prevProps.coin.id === nextProps.coin.id;
    });
