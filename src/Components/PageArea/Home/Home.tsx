import { CoinCard } from "../../CoinArea/CoinCard/CoinCard";
import "./Home.css";
import { useCoinsList } from "../../../Hooks/useCoinsList";

export function Home() {

    const { searchText, selectedIds, filteredCoins, renderSelected } = useCoinsList();

    return (
        <div className="Home">

            <h1 className="pageTitle">
                {searchText ? `Search results for "${searchText}"` : "Crypto Currencies"}
            </h1>

            <div className="coinsList">
                {filteredCoins.map(c => 
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
