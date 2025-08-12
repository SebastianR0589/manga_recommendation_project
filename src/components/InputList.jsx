export default function InputList(props) {

const mangaList = Array.isArray(props.mangaInputs) ? props.mangaInputs : [];

    const recommendationsListItems = mangaList.map(manga => (
        <li key={manga}>{manga}</li>
    ))
    return (
        <section>
            <h2>Mangas you enjoyed:</h2>
            <ul className="mangainputs-list" aria-live="polite">{recommendationsListItems}</ul>
            {props.mangaInputs?.length > 3 && <div className="get-recommendations-container">
                <div>
                    <h3>Ready for some Manga recommendations?</h3>
                    <p>Generate a list of Manga recommendations based on your taste.</p>
                </div>
                <button onClick={props.getRecommendations}>Get recommendations</button>
            </div>}
        </section>
    )
}