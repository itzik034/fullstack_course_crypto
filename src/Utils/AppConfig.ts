class AppConfig {
	// public readonly coinsUrlUSD = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
	public readonly coinsUrlUSD = "/src/assets/coins.json";
    public readonly coinUrl = "https://api.coingecko.com/api/v3/coins/";
    public readonly realTimeReportUrl = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=";

}

export const appConfig = new AppConfig();
