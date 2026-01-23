import OpenAI from "openai";
import { appConfig } from "../Utils/AppConfig";
import { PromptModel } from "../Models/PromptModel";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";

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

}

export const gptService = new GptService();
