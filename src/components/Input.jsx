import React from "react"
import InputList from "./InputList"
import RecommendationsList from "./RecommendationsList"
import { getMangasFromMistral } from "../ai.js"

export default function Input() {
    const [mangaInputs, setMangaInputs] = React.useState(
        []
    )
    const [recommendations, setRecommendations] = React.useState("")

    const [errorMessage, setErrorMessage] = React.useState("")

    async function getRecommendations() {
        const recommendationsMarkdown = await getMangasFromMistral(mangaInputs)
        setRecommendations(recommendationsMarkdown)
    }

    function addManga(formData) {
        const newMangaInput = formData.get("manga")
        setErrorMessage("") 
        if(newMangaInput.trim() !== ""){
        setMangaInputs(prevMangaInputs => [...prevMangaInputs, newMangaInput])
        }else{
            setErrorMessage("Please enter a valid manga name.")
            }
    }

    return (
        <main>
            <h2>Please enter up to five Mangas you enjoyed</h2>
            <form action={addManga} className="add-manga-form">
                <input
                    type="text"
                    placeholder="e.g. Vagabond, One Piece, etc."
                    aria-label="Add Manga"
                    name="manga"
                />
                <button disabled={mangaInputs.length >= 5}>Add Manga</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {mangaInputs?.length > 0 &&
                <InputList
                    mangaInputs={mangaInputs}
                    getRecommendations={getRecommendations}
                />
            }

            {recommendations && <RecommendationsList recommendations={recommendations} />}
        </main>
    )
}