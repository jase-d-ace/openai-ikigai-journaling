import { useState } from 'react'
import './App.css'

function App() {
    const [formData, setFormData] = useState({})
    const [results, setResults] = useState(null)

    const debounce = (name, query, interval) => {
        setTimeout(() => {
            setFormData({...formData, [name]: query})
        }, interval)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const data = await fetch("http://localhost:8000/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const json = await data.json()
        setResults(json.response)

        let pastEntries = JSON.parse(localStorage.getItem("past_entries")) || [];

        const newEntry = {
            ...formData,
            date: new Date().toLocaleDateString(),
            response: json.response.content
        }

        pastEntries.push(newEntry)

        localStorage.setItem("past_entries", JSON.stringify(pastEntries))

    }

    return (
        <div>
            <header>
                <h2>
                    Today's Journal Entry
                </h2>
                <h4>
                    Tell us how you're feeling, then write some notes, and hear something uplifting from GPT :)
                </h4>
            </header>
            <form className="journal-form" onSubmit={handleFormSubmit}>
                <div className="form-part title">
                    <label>Title</label>
                    <input className="text-input" required type="text" placeholder="title" onChange={e => debounce("title", e.target.value, 500)} />
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
                            <div key={i} className="option">
                                <label>{option.label}</label>
                                <input 
                                    required
                                    className="submit"
                                    type="radio" 
                                    aria-label={option.emotion} 
                                    onChange={() => setFormData({...formData, feeling: option.feeling})} 
                                    value={option.feeling}
                                    checked={formData.feeling == option.feeling}
                                />                        
                            </div>
                            )
                        }
                    </div>
                </div>
                <div className="form-part journal-entry">
                    <label>Write your thoughts</label>
                    <textarea className="text-input" required onChange={e => debounce("journal_entry", e.target.value, 500)} rows="10" cols="100"></textarea>
                </div>
                <input className="submit" type="submit" value="gogogo" />
            </form>

            <div className="results-container">
                {results && results.content}
            </div>
        </div>
    )
}

export default App
