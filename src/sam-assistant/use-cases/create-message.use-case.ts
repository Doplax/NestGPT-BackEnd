import OpenAI from "openai";

interface Options {
    threadId: string;
    questions: string
}

export const createMessageUseCase = async (openAi:OpenAI ,options:Options) => {
    const { threadId, questions } = options;

    const message = await openAi.beta.threads.messages.create( threadId, {
        role: 'user',
        content: questions,
    })

    //console.log(message);
    return message
}