import ReactMarkdown from "react-markdown"

export default function RecommendationsList(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Suggested Manga Recommendations:</h2>
            <ReactMarkdown>
                 {props.recommendations}
            </ReactMarkdown>
           
        </section>
    )
}