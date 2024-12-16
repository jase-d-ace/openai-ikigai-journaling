import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "./authContext.jsx";
import Loading from "./components/Loading.jsx";
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
                    What is Your Ikigai?
                </h2>
                <p>Let GPT help you find your Ikigai. This is the intersection of what you love to do, what you're good at, what the world needs, and what you can be paid for.</p>
            </header>
            <form className="journal-form" onSubmit={handleFormSubmit}>
                {
                    [
                        {
                            label: "passion",
                            human_label: "What Do You Love?",
                            placeholder: "Are you absorbed in your work? Do you have a hobby or craft you can’t seem to get enough of? Are you more excited about your hobby or craft than anything else?"
                        },
                        {
                            label: "profession",
                            human_label: "What Are You Good At?",
                            placeholder: "Do people ask you for advice on topics related to your work? Are you/Do you want to be an expert at what you do? Do people compliment you on your hobby or craft?"
                        },
                        {
                            label: "mission",
                            human_label: "What Does the World Need?",
                            placeholder: "Is your work considered a high demand in the marketplace? Picture the next year, 10 years, and 100 years — will your work still be valuable? Are you solving a social, economic, or environmental problem?"
                        },
                        {
                            label: "vocation",
                            human_label: "What Can You Be Paid For?",
                            placeholder: "Do you make a good living/Will you eventually make a good living doing your work? Have other people made a career out of the same hobby or craft?"
                        }
                    ].map(aspect => (
                        <div className={`form-part ${aspect.label}`}>
                            <label>{aspect.human_label}</label>
                            <textarea 
                                className={`text-input ${aspect.label}-input`}
                                required
                                placeholder={aspect.placeholder}
                                onChange={e => debounce(aspect.label, e.target.value, 500)}
                                rows="5" cols="100"
                            >
                            </textarea>
                        </div>
                    ))
                }
                <div className="form-part journal-entry">
                    <label>Any other things that are relevant to you and your core values</label>
                    <textarea placeholder="Tell me your thoughts" className="text-input" required onChange={e => debounce("content", e.target.value, 500)} rows="5" cols="100"></textarea>
                </div>
                <input className="submit" type="submit" value="Submit" />
            </form>
            {
                loading && <Loading />
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
