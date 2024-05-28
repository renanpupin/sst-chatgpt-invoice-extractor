import OpenAI, {toFile} from 'openai'
import fs from 'fs'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is the default and can be omitted
})

// //These arrays are to maintain the history of the conversation
// const conversationContext: [string, string] = []
// const currentMessages: Array<{role: string; content: string}> = []

export async function handler(event: any, context: any) {
    // const {prompt} = event.body
    // const modelId = 'gpt-3.5-turbo'
    // const promptText = `${prompt}\n\nResponse:`
    //
    // // Restore the previous context
    // for (const [inputText, responseText] of conversationContext) {
    //     currentMessages.push({role: 'user', content: inputText})
    //     currentMessages.push({role: 'assistant', content: responseText})
    // }
    //
    // // Stores the new message
    // currentMessages.push({role: 'user', content: promptText})
    //
    // const result = await openai.createChatCompletion({
    //     model: modelId,
    //     messages: currentMessages
    // })
    //
    // const responseText = result.data.choices.shift().message.content
    // conversationContext.push([promptText, responseText])

    // const chatCompletion = await openai.chat.completions.create({
    //     messages: [{role: 'user', content: 'Say this is a test'}],
    //     model: 'gpt-3.5-turbo'
    //     // model: 'gpt-4',
    //     // stream: true,
    // })
    // console.log('chatCompletion', JSON.stringify(chatCompletion, null, 2))

    const result = await openai.files.create({
        file: fs.createReadStream('invoice.webp'),
        purpose: 'fine-tune'
    })
    console.log('result', JSON.stringify(result, null, 2))

    // // Finally, if none of the above are convenient, you can use our `toFile` helper:
    // await openai.files.create({
    //     file: await toFile(Buffer.from('my bytes'), 'input.jsonl'),
    //     purpose: 'fine-tune',
    // });
    // await openai.files.create({
    //     file: await toFile(new Uint8Array([0, 1, 2]), 'input.jsonl'),
    //     purpose: 'fine-tune',
    // });

    return {
        statusCode: 200,
        body: JSON.stringify({response: ''}, null, 2)
    }
}
