import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoinModel } from "../Models/CoinModel";

function initCoins(_currentState: CoinModel[], action: PayloadAction<CoinModel[]>): CoinModel[] {
    // Get and return all of the coins
    const coinsToInit = action.payload;
    return coinsToInit;
}

function updateCoin(currentState: CoinModel[], action: PayloadAction<CoinModel>): CoinModel[] {
    // Get the coin
    const coinToUpdate = action.payload;

    // Find the index of the coin in the current Global State
    const index = currentState.findIndex(c => c.id === coinToUpdate.id);

    // If the coin exists update the currencies (USD, EUR, ILS) of this coin
    if(index !== -1) { currentState[index] = coinToUpdate }
    else { currentState.push(coinToUpdate) }

    // Return the Global State with the updated data
    return currentState;
}

export const coinsSlice = createSlice({
    name: "coins-slice", 
    initialState: [] as CoinModel[], 
    reducers: { initCoins, updateCoin }
});