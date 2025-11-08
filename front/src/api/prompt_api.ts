import {prompt_api} from "./clients.ts";

export interface PromptResponse{
    response: PromptData
}

interface PromptData {
    summary: string
    experience: [string]
    skills: [string]
}

export const getShortPrompt = async (prompt: string): Promise<PromptResponse | null> => {
    try {
        const { data } = await prompt_api.post<PromptResponse>("/api/v1/prompts/short", prompt);
        if (data.response.summary.includes('Unable')) {
            return null;
        }
        return data
    } catch (err) {

        return null;
    }
};