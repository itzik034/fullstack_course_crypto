import OpenAI from "openai";
import { appConfig } from "../Utils/AppConfig";
import { PromptModel } from "../Models/PromptModel";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import { ResponseModel } from "../Models/ResponseModel";
import { notify } from "../Utils/Notify";
import { CoinDataModel } from "../Models/CoinDataModel";

class GptService {

    // Create a new openai object to use in this service
    private openai = new OpenAI({
        apiKey: appConfig.chatGptApiKey,
        dangerouslyAllowBrowser: true
    });

    // Function to send a prompt to ChatGPT and return a response
    public async getCompletion(prompt: PromptModel): Promise<string> {

        // Data to send
        const body: ChatCompletionCreateParamsNonStreaming = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: prompt.systemContent },
                { role: "user", content: prompt.userContent }
            ]
        };

        // Send the request
        const response = await this.openai.chat.completions.create(body);

        // Get the recommendation
        const recommendation = response.choices[0].message.content!;

        // Return the recommendation
        return recommendation;

    }

    // 
    public async getAIRecommendation (coin: string, coinData: CoinDataModel): Promise<string | undefined> {
        try {

            // Create a new prompt object
            const prompt = new PromptModel();

            // Convert the received coinData object to text for the AI prompt
            const coinDataAsText = JSON.stringify(coinData);

            // Set the role for ChatGPT
            prompt.systemContent = `You are an expert in crypto marketing, 
                                specializing in buying and selling recommendations.`;

            // The prompt content for ChatGPT
            prompt.userContent = `Write me a recommendation about the following crypto coin: ${coin}.
                                  In your recommendation, consider the following information: ${coinDataAsText}
                                  I need it to include an instruction if buy or sell or do something else, and the reason why.
                                  I want the reason to last about 150 words long.
                                  The format of your response must be like this: ${ResponseModel.response}
                                  Do not include any other text or information.`;

            // Send the prompt to ChatGPT
            const completion = await this.getCompletion(prompt);

            // Get the response
            return completion;

        }
        catch (err) {
            notify.error(err);
        }
    };

}

export const gptService = new GptService();
