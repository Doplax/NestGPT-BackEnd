import OpenAI from "openai";


interface Options {
    threadId: string;
    assistantId?: string
}
export const createRunUseCase = async (openAi:OpenAI, options:Options) => {

    const { threadId, assistantId = 'asst_qD4GW0pzR2a3iUGBGnqXhxuX' } = options;

    const run = await openAi.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        //instructions; // !Caution: this overrides the assistant instructions
    })

    console.log({run});
    return run
}