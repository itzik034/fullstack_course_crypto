class AppConfig {
	public readonly coinsUrlUSD = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
	
    public readonly coinUrl = "https://api.coingecko.com/api/v3/coins/";

}

export const appConfig = new AppConfig();
