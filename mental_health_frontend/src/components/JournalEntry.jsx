import "../App.css";

export default function JournalEntry({ published_at, title, feeling, content, answer}) {
    const feelingsMap = {
        "-2": "Awful",
        "-1": "Bad",
        "0": "Neutral",
        "1": "Good",
        "2": "Amazing"

    }
    return (
        <div className="entry-holder">
            <div className="journal-header">
                <strong>{ new Date(published_at).toLocaleDateString() } - {title} </strong>
                <p className="emotion"> You felt <strong>{feelingsMap[feeling]}</strong> </p>
            </div>
            <div className="entry">
                <span>{content}</span>                
            </div>
            <div className="answer">
                <strong> GPT-4o-mini said... </strong>
                <span>{answer}</span>
            </div>
        </div>
    )
}