import { useState, useEffect } from "react";

export default function HistoricalContainer() {
    const [pastEntries, setPastEntries] = useState([]);

    useEffect(() => {
        const dataFetch = async() => {
            const data = await fetch("http://localhost:8000/journals");
            const json = await data.json();
            setPastEntries(json)
        }

        dataFetch()
    }, []);
    
    return (
        <div>
            {
                pastEntries.journals?.length > 0 ?
                pastEntries.journals.map(entry => (
                    <div>
                        <h1>{entry.date}</h1>
                        {entry.title}
                        {entry.feeling}
                        {entry.content}
                        {entry.answer}
                    </div>
                )) : 
                <span> No entries yet! Go make some. </span>
            }
        </div>
    )
}