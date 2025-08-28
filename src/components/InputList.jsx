export default function InputList(props) {
  const mangaList = Array.isArray(props.mangaInputs) ? props.mangaInputs : [];
  const excludedMangaList = Array.isArray(props.excludedMangaInputs)
    ? props.excludedMangaInputs
    : [];

  const recommendationsListItems = mangaList.map((manga) => (
    <li key={manga}>{manga}</li>
  ));
  const excludedListItems = excludedMangaList.map((manga) => (
    <li key={manga}>{manga}</li>
  ));
  return (
    <section>
      <h2>Mangas you enjoyed:</h2>
      <ol className="mangainputs-list" aria-live="polite">
        {recommendationsListItems}
      </ol>
      <h2>Mangas you want excluded:</h2>
      <ol className="mangainputs-list" aria-live="polite">
        {excludedListItems}
      </ol>
      {props.mangaInputs?.length >= 1 && (
        <div className="get-recommendations-container">
          <div ref={props.ref}>
            <h3>Ready for some Manga recommendations?</h3>
            <p>Generate a list of Manga recommendations based on your taste.</p>
          </div>
          <button onClick={props.getRecommendations}>
            Get recommendations
          </button>
        </div>
      )}
    </section>
  );
}
