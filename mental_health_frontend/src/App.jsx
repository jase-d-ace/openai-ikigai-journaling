import { useState } from 'react'
import './App.css'

function App() {
    const [formData, setFormData] = useState({})
    const [results, setResults] = useState(null)

    const debounce = (query, interval) => {
        setTimeout(() => {
            setFormData({...formData, journal_entry: query})
        }, interval)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(data => data.json())
        .then(json => setResults(json))
        .catch(e => setResults(e))
    }

    return (
        <div>
            <header>
                <h2>
                    Today's Journal Entry
                </h2>
                <h3>
                    Tell us how you're feeling, then write some notes, and hear something uplifting from GPT :)
                </h3>
            </header>
            <form onSubmit={handleFormSubmit}>
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
                            <input type="radio" onChange={() => setFormData({...formData, feeling: option.feeling})} value={option.feeling} />                        
                        </div>
                        )
                    }
                </div>
                <textarea onChange={e => debounce(e.target.value, 500)} rows="10" cols="100"></textarea>
                <input type="submit" value="gogogo" />
            </form>

            <div className="results-container">
                {results && JSON.stringify(results)}
            </div>
        </div>
    )
}

export default App
