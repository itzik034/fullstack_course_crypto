class AppConfig {
    // public readonly coinsUrlUSD = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    public readonly coinsUrlUSD = "/src/assets/coins.json"; // This is a copy of the coins data
    public readonly coinUrl = "https://api.coingecko.com/api/v3/coins/";
    // public readonly realTimeReportUrl = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=";
    public readonly realTimeReportUrl = "/src/assets/report.json"; // Mark this line as comment and unmark the last line to display real results
    public readonly chatGptApiKey = import.meta.env.VITE_CHATGPT_API_KEY;
    public readonly gptApiUrl = "https://api.openai.com/v1/chat/completions";

}

export const appConfig = new AppConfig();
