import OpenAI from "openai";


export const createThreadUseCase = async (openAi:OpenAI) => {
    const thread = await openAi.beta.threads.create({})

    const { id } = thread

    console.log(thread);
    
    return { id }
}