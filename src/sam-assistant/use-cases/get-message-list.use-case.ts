import OpenAI from "openai";

interface Options {
    threadId: string;
}

export const getMessageListUseCase = async (openAi:OpenAI, options) => {

    const { threadId } = options;

    const messageList = await openAi.beta.threads.messages.list(threadId)

    //console.log(messageList);


    const messages = messageList.data.map((message) => ({
        role: message.role,
        content: message.content.map((content) => (content as any).text.value),
        //id: message.id,
        //created_at: message.created_at,
    }))

    return messages


}