import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinModel } from "../Models/CoinModel";

function initCoins(currentState: CoinsState, action: PayloadAction<CoinModel[]>): CoinsState {
    // Get the coins from the action payload
    const coinsToInit = action.payload;

    // Update the coins array inside the Global State object
    currentState.coins = coinsToInit;

    // Return the updated Global State object
    return currentState;
}

function updateCoin(currentState: CoinsState, action: PayloadAction<CoinModel>): CoinsState {
    // Get the coin
    const coinToUpdate = action.payload;

    // Find the index of the coin in the current Global State
    const index = currentState.coins.findIndex(c => c.id === coinToUpdate.id);

    // If the coin exists update the currencies (USD, EUR, ILS) of this coin
    if(index !== -1) { currentState.coins[index] = coinToUpdate }
    else { currentState.coins.push(coinToUpdate) }

    // Return the Global State with the updated data
    return currentState;
}

function setSearchValue(currentState: CoinsState, action: PayloadAction<string>): CoinsState {
    // Get the search text from the action payload
    const value = action.payload;

    // Update the searchText inside the Global State object
    currentState.searchText = value;

    // Return the updated Global State object
    return currentState;
}

// Set the format of CoinsState
export type CoinsState = {
    coins: CoinModel[], 
    searchText: string
}

// A custom initialState for this slice
const initialState: CoinsState = {
    coins: [], 
    searchText: ""
};

export const coinsSlice = createSlice({
    name: "coins-slice", 
    initialState: initialState, 
    reducers: { initCoins, updateCoin, setSearchValue }
});