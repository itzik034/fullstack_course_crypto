import { PromptModel } from "../Models/PromptModel";
import { gptService } from "../Services/GptService";
import { notify } from "../Utils/Notify";

export const getAIRecommendation = async (coin: string): Promise<string | undefined> => {
    try {

        const prompt = new PromptModel();

        prompt.systemContent = `You are an expert in crypto marketing, 
                                specializing in buying and selling recommendations.`;

        prompt.userContent = `Write me a recommendation about the following crypto coin: ${coin}.
                              I need it to include an instruction if buy or sell or do nothing, and the reason why.
                              I want it to last 100 word long max.`;

        const completion = await gptService.getCompletion(prompt);

        return completion;

    }
    catch (err) {
        notify.error(err);
    }
};