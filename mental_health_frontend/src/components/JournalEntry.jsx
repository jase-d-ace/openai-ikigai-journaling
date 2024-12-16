import "../App.css";

export default function JournalEntry({ published_at, passion, profession, mission, vocation, answer}) {

    return (
        <div className="entry-holder">
            <div className="journal-header">
                <strong>{ new Date(published_at).toLocaleDateString() } </strong>
            </div>
            <div className="entry-text your-answers">
                <strong>Your Passion:</strong>
                <p>{passion}</p>
                <strong>Your Profession:</strong>
                <p>{profession}</p>
                <strong>Your Mission</strong>
                <p>{mission}</p>
                <strong>Your Vocation</strong>
                <p>{vocation}</p>
            </div>
            <div className="entry-text answer">
                <strong> GPT-4o-mini said... </strong>
                <p>{answer}</p>
            </div>
        </div>
    )
}