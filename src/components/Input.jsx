import React from "react";
import InputList from "./InputList";
import RecommendationsList from "./RecommendationsList";
import { getMangasFromMistral } from "../ai.js";

export default function Input() {
  const [mangaInputs, setMangaInputs] = React.useState([]);
  const [excludedMangaInputs, setExcludedMangaInputs] = React.useState([]);

  const [recommendations, setRecommendations] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [completionCheckbox, setCompletionCheckbox] = React.useState(false);

  const [lengthSelect, setLengthSelect] = React.useState("");

  async function getRecommendations() {
    const recommendationsMarkdown = await getMangasFromMistral(
      mangaInputs,
      excludedMangaInputs,
      completionCheckbox,
      lengthSelect
    );
    setRecommendations(recommendationsMarkdown);
  }

  function addManga(formData, mangaInput, setMangaInputsFunctions) {
    const newMangaInput = formData.get(mangaInput);
    setErrorMessage("");
    if (newMangaInput.trim() !== "") {
      setMangaInputsFunctions((prevMangaInputs) => [
        ...prevMangaInputs,
        newMangaInput,
      ]);
    } else {
      setErrorMessage("Please enter a valid manga name.");
    }
  }

  function handleCheckboxChange(event) {
    setCompletionCheckbox(event.target.checked);
  }

  function handleLengthChange(event) {
    setLengthSelect(event.target.value);
  }

  return (
    <main>
      <div>
        <h2>Please enter up to five Mangas you enjoyed</h2>
        <form
          action={(formData) => addManga(formData, "manga", setMangaInputs)}
          className="manga-form add-manga-form"
        >
          <input
            type="text"
            placeholder="e.g. Vagabond, Real, etc."
            aria-label="Add Manga"
            name="manga"
          />
          <button disabled={mangaInputs.length >= 5}>Add Manga</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div>
        <h2>Please enter up to five Mangas you want excluded</h2>

        <form
          action={(formData) =>
            addManga(formData, "excluded", setExcludedMangaInputs)
          }
          className="manga-form exclude-manga-form"
        >
          <input
            type="text"
            placeholder="e.g. Attack on Titan, Frieren, etc."
            aria-label="Exclude Manga"
            name="excluded"
          />
          <button disabled={mangaInputs.length >= 5}>Exclude Manga</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="only-completed-checkbox">
        <label>
          <input
            type="checkbox"
            id="onlyCompleted"
            name="onlyCompleted"
            onChange={handleCheckboxChange}
          />
          Do you only want completed Manga series?
        </label>
      </div>

      <div className="manga-length-container">
        <label htmlFor="mangaLength">
          How long should the Manga series be?
        </label>
        <select
          name="mangaLength"
          id="mangaLength"
          value={lengthSelect}
          onChange={handleLengthChange}
        >
          <option value="anyLength">Doesn't matter</option>
          <option value="1-5 Volumes">Short (1-5 Volumes)</option>
          <option value="5-15 Volumes">Medium (5-15 Volumes)</option>
          <option value="15+ Volumes">Long (15+ Volumes)</option>
        </select>
      </div>

      {(mangaInputs.length > 0 || excludedMangaInputs.length > 0) && (
        <InputList
          mangaInputs={mangaInputs}
          excludedMangaInputs={excludedMangaInputs}
          getRecommendations={getRecommendations}
        />
      )}

      {recommendations && (
        <RecommendationsList recommendations={recommendations} />
      )}
    </main>
  );
}
