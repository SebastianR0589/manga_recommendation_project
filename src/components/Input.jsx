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

    const [completionCheckbox, setCompletionCheckbox] = React.useState(false)

    async function getRecommendations() {
        const recommendationsMarkdown = await getMangasFromMistral(mangaInputs, completionCheckbox)
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

    function handleCheckboxChange(event) {
        setCompletionCheckbox(event.target.checked)    
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
             <div className="only-completed-checkbox">
   
    <label><input type="checkbox" id="onlyCompleted" name="onlyCompleted" onChange={handleCheckboxChange}/>Do you only want completed Manga series?</label>
  </div>

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