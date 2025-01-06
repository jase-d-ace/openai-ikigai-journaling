const capitalize = str => {
    const [first, ...rest] = str.split("");
    const capital = first.toUpperCase();
    return `${capital}${rest.join("")}`;
};

export default function FormNav( { questions, currentQuestion, setCurrentQuestion } ) {
    const responseNeeded = question => !question.response;

    return (
        <div className="form-nav navigation">
            {
                questions.map((question, i) => (
                <span className={`${currentQuestion == i ? "current" : ""} ${responseNeeded(question) ? "unanswered" : ""}`} onClick={() => setCurrentQuestion(i)}> {capitalize(question.label)} </span>))
            }
        </div>
    );
};