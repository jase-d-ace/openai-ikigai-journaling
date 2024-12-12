import { useState, useEffect } from "react";
import { useAuth } from "../authContext";

export default function HistoricalContainer() {
    const [pastEntries, setPastEntries] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const dataFetch = async() => {
            const data = await fetch(`http://localhost:8000/journals?id=${currentUser.user.id}`);
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