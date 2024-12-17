import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "./authContext.jsx";
import Loading from "./components/Loading.jsx";
import Markdown from "react-markdown";
import './App.css';

const questions = [
    {
        label: "passion",
        human_label: "What Do You Love?",
        placeholder: "Are you absorbed in your work? Do you have a hobby or craft you can’t seem to get enough of? Are you more excited about your hobby or craft than anything else?",
        response: ""
    },
    {
        label: "profession",
        human_label: "What Are You Good At?",
        placeholder: "Do people ask you for advice on topics related to your work? Are you/Do you want to be an expert at what you do? Do people compliment you on your hobby or craft?",
        response: ""
    },
    {
        label: "mission",
        human_label: "What Does the World Need?",
        placeholder: "Is your work considered a high demand in the marketplace? Picture the next year, 10 years, and 100 years — will your work still be valuable? Are you solving a social, economic, or environmental problem?",
        response: ""
    },
    {
        label: "vocation",
        human_label: "What Can You Be Paid For?",
        placeholder: "Do you make a good living/Will you eventually make a good living doing your work? Have other people made a career out of the same hobby or craft?",
        response: ""
    },
    {
        label: "content",
        human_label: "Other Thoughts (Optional)",
        placeholder: "What else is on your mind that's relevant to what you love and what you believe your calling is?",
        response: ""
    }
];

function App() {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const { currentUser } = useAuth();

    const questionHasAnswer = (question) => !!question.response;

    const formisValid = () => {
        for (let i = 0 ; i < questions.length - 1 ; i++) { // last box is optional, so can submit without it
            if (!questionHasAnswer(questions[i])) {
                return false
            }
        }
        return true;
    }

    const handleInputChange = (name, query) => {

        setFormData({...formData, [name]: query});
        questions[currentQuestion].response = query;
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
                <div className={`form-part ${questions[currentQuestion].label}`}>
                    <label>{questions[currentQuestion].human_label}</label>
                    <textarea 
                        className={`text-input ${questions[currentQuestion].label}-input`}
                        placeholder={questions[currentQuestion].placeholder}
                        onChange={e => handleInputChange(questions[currentQuestion].label, e.target.value)}
                        value={questions[currentQuestion].response}
                        rows="5" cols="100"
                    >
                    </textarea>
                    <div className="buttons">
                        {currentQuestion > 0 ? <button className="button back" type="button" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Back</button> : ""} 
                        {currentQuestion == 4 && formisValid() && <input className="button submit"  type="submit" value="Submit" />}
                        {currentQuestion < 4 ? <button className="button next" type="button" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>: ""}
                    </div>
                </div>
            </form>
            {
                loading && <Loading />
            }
            {
                results &&
                <div className="results-container">
                    <Markdown>
                        {results.answer}
                    </Markdown>
                </div>
            }
        </div> :
        <Navigate replace to="/login" />
    )
}

export default App
