import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of mangas that a user has enjoyed very much and suggests a list of new manga recommendations based upon those mangas he read and enjoyed. Format your response in markdown to make it easier to render to a web page
`


const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getMangasFromMistral(mangasArr) {
    const mangasString = mangasArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${mangasString}. Please give me a list of recommendations what I should read next!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
