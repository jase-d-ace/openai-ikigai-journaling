export default function HistoricalContainer() {
    const pastEntries = JSON.parse(localStorage.getItem("past_entries")) || [];
    return (
        <div>
            {
                pastEntries.length > 0 ?
                pastEntries.map(entry => (
                    <div>
                        <h1>{entry.date}</h1>
                        {entry.title}
                        {entry.feeling}
                        {entry.journal_entry}
                        {entry.response}
                    </div>
                )) : 
                <span> No entries yet! Go make some. </span>
            }
        </div>
    )
}