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

        let pastEntries = JSON.parse(localStorage.getItem("past_entries")) || []

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
                <h3>
                    Tell us how you're feeling, then write some notes, and hear something uplifting from GPT :)
                </h3>
            </header>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="title" onChange={e => debounce("title", e.target.value, 500)} />
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
                <textarea onChange={e => debounce("journal_entry", e.target.value, 500)} rows="10" cols="100"></textarea>
                <input type="submit" value="gogogo" />
            </form>

            <div className="results-container">
                {results && results.content}
            </div>
        </div>
    )
}

export default App
