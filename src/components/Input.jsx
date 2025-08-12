import React from "react"
import InputList from "./InputList"
import RecommendationsList from "./RecommendationsList"
import { getMangasFromMistral } from "../ai.js"

export default function Input() {
    const [mangaInputs, setMangaInputs] = React.useState(
        ["Vagabond", "Real", "Berserk", "Slam Dunk"]
    )
    const [recommendations, setRecommendations] = React.useState("")

    async function getRecommendations() {
        const recommendationsMarkdown = await getMangasFromMistral(mangaInputs)
        setRecommendations(recommendationsMarkdown)
    }

    function addManga(formData) {
        const newMangaInput = formData.get("manga")
        setMangaInputs(prevMangaInputs => [...prevMangaInputs, newMangaInput])
    }

    return (
        <main>
            <form action={addManga} className="add-manga-form">
                <input
                    type="text"
                    placeholder="e.g. Vagabond, One Piece, etc."
                    aria-label="Add Manga"
                    name="manga"
                />
                <button>Add Manga</button>
            </form>

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