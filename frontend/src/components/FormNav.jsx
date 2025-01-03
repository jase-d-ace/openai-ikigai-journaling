export default function FormNav( { questions, currentQuestion, setCurrentQuestion } ) {
    const responseNeeded = question => !question.response;
    return (
        <div className="form-nav navigation">
            {
                questions.map((question, i) => (
                <span className={`${currentQuestion == i ? "current" : ""} ${responseNeeded(question) ? "unanswered" : ""}`} onClick={() => setCurrentQuestion(i)}> {question.label} </span>))
            }
        </div>
    )
}