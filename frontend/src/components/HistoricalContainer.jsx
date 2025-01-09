import { useState } from "react";
import { useAuth } from "../authContext";
import JournalEntry from "./JournalEntry";
import "../App.css";

export default function HistoricalContainer() {
    const [pastEntries, setPastEntries] = useState({});
    const { currentUser } = useAuth();

    const dataFetch = async id => {
        const data = await fetch(`http://localhost:8000/journals?id=${id}`);
        const json = await data.json();
        setPastEntries(json)
    }
    if (currentUser.isLoggedIn && !pastEntries.journals?.length) {
        dataFetch(currentUser.user.id);
    }

    return (
        <div className="past-entries">
            <header>
                <h2>Your Entries</h2>
            </header>
            <div className="entries">
                {
                    pastEntries.journals?.length > 0 ?
                    pastEntries.journals.map(entry => (
                        <JournalEntry {...entry} />
                    )) : 
                    <span> No entries yet! Go make some. </span>
                }                
            </div>
            <p>Your Ikigai is closer than you think. Keep moving towards it.</p>
        </div> 
    )
}