import { CoinModel } from "../../../Models/CoinModel";
import "./CoinCard.css";
import { memo, useState } from "react";
import { notify } from "../../../Utils/Notify";
import { coinService } from "../../../Services/CoinService";
import { SwitchLimitDialog } from "../SwitchLimitDialog/SwitchLimitDialog";
import { Button, Switch } from "@mui/material";

type CoinCardProps = {

    coin: CoinModel;
    isSelected: boolean;
    onRender: () => void;

};

// We're using memo to tell React "Don't re-render it unless the props changed"
// It's done for updating the switch when Home tell us to (Home component managing the list of switches status)
export const CoinCard = memo((props: CoinCardProps) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [coinDetails, setCoinDetails] = useState<CoinModel>(props.coin);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // Get the element who changed (the specific coin switch)
        const checked = event.target.checked;

        // Get the current list of checked items
        const saved = localStorage.getItem("coinsSwitches");

        // If there's a list convert it into an object
        let coinsIds: string[] = saved ? JSON.parse(saved) : [];

        /*  If the user trying to turn on more than 5 switches it won't be possible, 
            and a dialog will be displayed  */
        if (checked && coinsIds.length >= 5) {
            setDialogOpen(true);
            return;
        }

        // If marked as checked add it to the list, or remove it if unchecked
        if (checked) {
            coinsIds.push(props.coin.id!);
        }
        else {
            coinsIds = coinsIds.filter(id => id !== props.coin.id);
        }

        // Convert the checked coins list to json code
        const coinsListJson = JSON.stringify(coinsIds);

        // Save the new list to localStorage
        localStorage.setItem("coinsSwitches", coinsListJson);

        props.onRender();

    };

    const toggleFlip = async () => {

        if (!isFlipped && !coinDetails.eur) {
            try {
                const detailedCoin = await coinService.getCoinCurrency(props.coin.id!);
                setCoinDetails(detailedCoin);
            }
            catch (err) {
                notify.error(err);
            }
        }

        setIsFlipped(!isFlipped);

    };

    return (
        <div className={`CoinCard ${isFlipped ? "flipped" : ""}`}>

            <div className="cardInner">

                <div className="cardFront">
                    <div className="cardContent">
                        <div className="coinIcon"><img src={props.coin.image} /></div>
                        <div className="coinDetails">
                            <div className="coinName" title={props.coin.name}>{props.coin.name}</div>
                            <div className="coinSymbol">{props.coin.symbol}</div>
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
