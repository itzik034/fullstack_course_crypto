import { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CoinModel } from "../Models/CoinModel";
import { AppState } from "../Redux/AppState";
import { coinService } from "../Services/CoinService";
import { notify } from "../Utils/Notify";

export function useCoinsList() {
    
    // Coins list in Local State
    const [coins, setCoins] = useState<CoinModel[]>([]);

    // Typed search text
    const searchText = useSelector<AppState, string>(state => state.coins.searchText);

    // Save the active switches list to the Local State
    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem("coinsSwitches");
        return saved ? JSON.parse(saved) : [];
    });

    // Function to re-render the active switches list
    // We're using useCallBack to make sure the function created only once
    const renderSelected = useCallback(() => {
        const saved = localStorage.getItem("coinsSwitches");
        setSelectedIds(saved ? JSON.parse(saved) : []);
    }, []);

    // Load the coins list to Local State once - when app loaded
    useEffect(() => {
        coinService.getAllCoins()
            .then(coins => setCoins(coins))
            .catch(err => notify.error(err));
    }, []);

    // Used to display search results. 
    // Displays all of the coins if the user didn't search anything
    const filteredCoins = useMemo(() => {
        return (Array.isArray(coins) ? coins : []).filter(c =>
            // The user can search coins by name or symbol and it isn't case sensitive - 
            // cause we convert his search and the coin's name and symbol to lower case.
            c.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            c.symbol?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [coins, searchText]);

    // Return the relevant data to Home component
    return { searchText, selectedIds, filteredCoins, renderSelected };
    
}