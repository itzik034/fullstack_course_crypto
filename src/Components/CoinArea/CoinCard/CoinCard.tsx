import { Button, Switch } from "@mui/material";
import { CoinModel } from "../../../Models/CoinModel";
import "./CoinCard.css";
import { useState } from "react";
import { notify } from "../../../Utils/Notify";
import { coinService } from "../../../Services/CoinService";
import { SwitchLimitDialog } from "../SwitchLimitDialog/SwitchLimitDialog";

type CoinCardProps = {
    coin: CoinModel;
};

export function CoinCard(props: CoinCardProps) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [coinDetails, setCoinDetails] = useState<CoinModel>(props.coin);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // Saying if the current coin's switch saved as on or not
    const [isSet, setIsSet] = useState<boolean>(() => {
        
        // Get the current list of checked items
        const saved = localStorage.getItem("coinsSwitches");

        // If there isn't a list return false
        if (!saved) return false;

        // Convert the string value from localStorage to an array
        const coinsIds: string[] = JSON.parse(saved);

        // Return true if the id is in the list
        return coinsIds.includes(props.coin.id!);
    });

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // Get the element who changed (the specific coin switch)
        const checked = event.target.checked;
        
        // Get the current list of checked items
        const saved = localStorage.getItem("coinsSwitches");
        
        // If there's a list convert it into an object
        let coinsIds: string[] = saved ? JSON.parse(saved) : [];

        /*  If the user trying to turn on more than 5 switches it won't be possible, 
            and a dialog will be displayed  */
        if(checked && coinsIds.length >= 5) {
            setDialogOpen(true);
            return;
        }
        
        // Mark it as checked, or unchecked if already checked
        setIsSet(checked);
        
        // If marked as checked add it to the list, or remove it if unchecked
        if(checked) {
            coinsIds.push(props.coin.id!);
        }
        else {
            coinsIds = coinsIds.filter(id => id !== props.coin.id);
        }

        // Convert the checked coins list to json code
        const coinsListJson = JSON.stringify(coinsIds);

        // Save the new list to localStorage
        localStorage.setItem("coinsSwitches", coinsListJson);
        
    };

    const toggleFlip = async () => {
        
        if(!isFlipped && !coinDetails.eur) {
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
                                checked={isSet}
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
                onClose={ () => {setDialogOpen(false)} } />

        </div>
    );
}
