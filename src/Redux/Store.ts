import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { coinsSlice } from "./CoinsSlice";

export const store = configureStore<AppState>({
    // Register the Global State reducers
    reducer: {
        coins: coinsSlice.reducer // Connect app state coins to our slice
    }, 
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            /* 
                Because we added some values (like usd, eur, ils) that aren't exist in the 
                original array (the servers array) so we need to ignore 
                checking serializable.
            */
            serializableCheck: {
                ignoredActions: ["coins-slice/updateCoin", "coins-slice/initCoins"], 
                ignoredPaths: ["coins"]
            } 
        }), 
});