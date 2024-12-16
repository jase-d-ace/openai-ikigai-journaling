import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "./authContext.jsx";
import './App.css';

function App() {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const { currentUser } = useAuth();

    const debounce = (name, query, interval) => {
        setTimeout(() => {
            setFormData({...formData, [name]: query})
        }, interval)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const data = await fetch("http://localhost:8000/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, user_id: currentUser.user.id})
        })
        const json = await data.json()
        setResults(json)
        setLoading(false);

    }

    return (
        currentUser.isLoggedIn || localStorage.getItem("user_token") ? 
        <div className="todays-entry">
            <header>
                <h2>
                    Today's Journal Entry
                </h2>
            </header>
            <form className="journal-form" onSubmit={handleFormSubmit}>
                <div className="form-part title">
                    <label>Title</label>
                    <input className="text-input title-input" required type="text" placeholder="title" onChange={e => debounce("title", e.target.value, 500)} />
                </div>
                <div className="form-part feelings">
                    <label>How are you feeling?</label>
                    <div className="feeling-gauge">
                        {
                            [
                                {feeling: -2, label: ":(("},
                                {feeling: -1, label: ":("},
                                {feeling: 0, label: ":|"},
                                {feeling: 1, label: ":)"},
                                {feeling: 2, label: ":))"},
                            ].map((option, i) => 
                            <div key={i} className={`option ${formData.feeling == option.feeling ? "selected" : ""}`} onClick={() => setFormData({...formData, feeling: option.feeling})}>
                                <div 
                                    className="option-button"
                                >
                                    {option.label}
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>
                <div className="form-part journal-entry">
                    <label>Write your thoughts</label>
                    <textarea placeholder="write your thoughts here" className="text-input" required onChange={e => debounce("content", e.target.value, 500)} rows="10" cols="100"></textarea>
                </div>
                <input className="submit" type="submit" value="Submit" />
            </form>
            {
                loading && <p>loading...</p>
            }

            {
                results &&
                <div className="results-container">
                    {results.answer}
                </div>
            }
        </div> :
        <Navigate replace to="/login" />
    )
}

export default App
