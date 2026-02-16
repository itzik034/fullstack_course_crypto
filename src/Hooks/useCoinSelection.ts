import { useState } from "react";
import { coinSwitchService } from "../Services/CoinSwitchService";

export const useCoinSelection = (coinId: string, onRender: () => void) => {

    // Manage the dialog status
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // Get the element who changed (the specific coin's switch)
        const checked = event.target.checked;

        // If checked marks it as checked, or uncheck if not
        if (checked) {
            
            // If it returns true it means we added the coin to the list
            const success = coinSwitchService.addCheckedCoin(coinId);

            // If the adding didn't succeed it means there's more than 5 checked coins - 
            // so we open the dialog to ask the user to remove one of the checked coins
            if(!success) {
                setDialogOpen(true);
                return;
            }
        }
        else {
            // Remove the coin from the saved coins list
            coinSwitchService.removeCheckedCoin(coinId);
        }

        // Call to 'onRender' function for updating the switch on Home page
        onRender();

    };

    // Return the relevant data to CoinCard component
    return { dialogOpen, setDialogOpen, handleSwitchChange };

};