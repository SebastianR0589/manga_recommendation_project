import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of mangas that a user has enjoyed very much and suggests a list of new manga recommendations based upon those mangas he read and enjoyed. Format your response in markdown to make it easier to render to a web page
`


const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getMangasFromMistral(mangasArr, excludedMangasArr, completionBoolean, lengthSelect) {
    const mangasString = mangasArr.join(", ")
    const excludedMangasString = excludedMangasArr.join(", ")

    let onlyCompletedMangas = ""
     const lengthMap = {
  "1-5 Volumes": "I only want Manga series with 1-5 Volumes.",
  "5-15 Volumes": "I only want Manga series with 5-15 Volumes.",
  "15+ Volumes": "I only want Manga series with above 15 Volumes.",
}; 
  const lengthSelected = lengthMap[lengthSelect] || "";
    
  
     
    if (completionBoolean) {
        onlyCompletedMangas = "I only want completed Manga series."
    }


    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${mangasString}. Please give me a list of recommendations what I should read next! Please exclude ${excludedMangasString} and simliar from the recommendations! ${onlyCompletedMangas} ${lengthSelected}` },
              
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
