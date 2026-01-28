import { CoinCard } from "../../CoinArea/CoinCard/CoinCard";
import "./Home.css";
import { useCoinsList } from "../../../Hooks/useCoinsList";

export function Home() {

    // Calling to a custom hook we built - to get the data and logic
    const { searchText, selectedIds, filteredCoins: theCoins, renderSelected } = useCoinsList();

    return (
        <div className="Home">

            {/* If the user is searching change the page title */}
            <h1 className="pageTitle">
                {searchText ? `Search results for "${searchText}"` : "Crypto Currencies"}
            </h1>

            <div className="coinsList">
                {/* Get the coins list (filtered by user's search or all of them if not searching)
                    and print each one of them into a custom CoinCard */}
                {theCoins.map(c => 
                    <CoinCard 
                        key={c.id} 
                        coin={c} 
                        isSelected={selectedIds.includes(c.id!)} 
                        onRender={renderSelected} 
                    />)}
            </div>

        </div>
    );
}
