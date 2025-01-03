export default function FormNav( { questions, currentQuestion, setCurrentQuestion } ) {
    return (
        <div className="form-nav navigation">
            {
                questions.map((question, i) => (
                <span className={`${currentQuestion == i ? "current" : ""}`} onClick={() => setCurrentQuestion(i)}> {question.label} </span>))
            }
        </div>
    )
}