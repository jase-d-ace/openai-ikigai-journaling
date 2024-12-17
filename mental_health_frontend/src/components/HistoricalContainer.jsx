import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../authContext";
import JournalEntry from "./JournalEntry";
import "../App.css";

export default function HistoricalContainer() {
    const [pastEntries, setPastEntries] = useState({});
    const { currentUser } = useAuth();

    if (currentUser.isLoggedIn && !pastEntries.journals?.length) {
        const dataFetch = async () => {
            const data = await fetch(`http://localhost:8000/journals?id=${currentUser.user.id}`);
            const json = await data.json();
            setPastEntries(json)
        }

        dataFetch();
    }

    return (
        currentUser.isLoggedIn ? 
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
        </div> :
        <Navigate replace to="/login" />
    )
}