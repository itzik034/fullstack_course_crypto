class CoinSwitchService {

    private readonly STORAGE_KEY = "coinsSwitches";

    public getCheckedCoins(): string[] {

        // Get the current list of checked items
        const saved = localStorage.getItem("coinsSwitches");

        // If there's a list convert it into an object, 
        // or an empty array if not, and return it
        return saved ? JSON.parse(saved) : [];

    }

    public addCheckedCoin(id: string): boolean {
        
        // Get the checked coins ids
        const ids = this.getCheckedCoins();
        
        // Check if there's more than 5 checked coins
        if (ids.length >= 5) return false;

        // If the checked coin isn't check yet - push it into the ids array
        if(!ids.includes(id)) {
            ids.push(id);
            this.save(ids);
        }

        // If everything is alright - return true
        return true;

    }

    public removeCheckedCoin(id: string): void {
        
        // Get the checked coins id list
        const ids = this.getCheckedCoins();

        // Filter the list to remove the deleted id
        const newIds = ids.filter(coinId => coinId !== id);
        
        // Save the new list
        this.save(newIds);
    }

    private save(ids: string[]): void {
        
        // Save ths ids list into a json string
        const json = JSON.stringify(ids);

        // Save the json string to the localStorage
        localStorage.setItem(this.STORAGE_KEY, json);
    }

}

export const coinSwitchService = new CoinSwitchService();
