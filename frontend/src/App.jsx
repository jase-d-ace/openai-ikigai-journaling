import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "./authContext.jsx";
import { questions } from "./questions.js";
import Loading from "./components/Loading.jsx";
import FormNav from "./components/FormNav.jsx";
import Markdown from "react-markdown";
import './App.css';

function App() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [formData, setFormData] = useState({
        content: "No other thoughts"
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const { currentUser } = useAuth();

    const formisValid = () => {
        for (let i = 0 ; i < questions.length - 1 ; i++) { // last box is optional, so can submit without it
            if (!questions[i].response) {
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
        setShowMore(false);

        const data = await fetch("http://localhost:8000/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, user_id: currentUser.user.id})
        })
        const json = await data.json()
        setResults(json);
        setLoading(false);

    }

    return (
        currentUser.isLoggedIn || localStorage.getItem("user_token") ? 
        <div className="todays-entry">
            <header>
                <h2>
                    What is Your Ikigai?
                </h2>
            </header>
            <FormNav questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
            <div className="today-content">
                <div className="ikigai-info">
                    <div className="ikigai title">
                        <h3>{questions[currentQuestion].title}</h3>
                    </div>
                    <div className="ikigai explanation">
                        <p>{questions[currentQuestion].description}</p>
                    </div>
                    <div className="ikigai questions">
                        <h4>
                            Some questions to get you started...
                        </h4>
                        <ul className="question-list">
                            {
                                questions[currentQuestion].questions.map(question => (
                                    <li key={question} className="question"><span>{question}</span></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <form className="journal-form" onSubmit={handleFormSubmit}>
                    <div className={`form-part ${questions[currentQuestion].label}`}>
                        <div className="form-label">
                            <label>{questions[currentQuestion].human_label}</label> <small className="mobile-show-more" onClick={() => setShowMore(!showMore)}>{showMore ? "Less" : "More"} Info</small>
                        </div>
                        <textarea
                            className={`text-input ${questions[currentQuestion].label}-input`}
                            placeholder={questions[currentQuestion].placeholder}
                            onChange={e => handleInputChange(questions[currentQuestion].label, e.target.value)}
                            value={questions[currentQuestion].response}
                            rows="10" cols="100"
                        >
                        </textarea>
                        <small> Question {currentQuestion + 1} / 5</small>
                        <div className="buttons">
                            {currentQuestion > 0 ? <button className="button back" type="button" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Back</button> : ""} 
                            {currentQuestion == 4 && formisValid() && <input className="button submit"  type="submit" value="Submit" />}
                            {currentQuestion < 4 ? <button className="button next" type="button" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>: ""}
                        </div>
                    </div>
                    <div className="desktop-more-info">
                        <p>Take your time with these questions. They aren't easy to answer, and if you find yourself answering them quickly, take a breath and see if you can go even deeper into your thoughts. Are you only scratching the surface of your passions/skills/dreams? What more can you say about them? The more info you give, the more guidance we can give in return.</p>
                        <p>It's also okay to not know the answer to these questions. This is <i>your</i> journey, and your life, and your calling. No one can tell you how fast or slow you have to find it.</p>
                        
                    </div>
                </form>
            </div>
            { showMore &&
                <div className="mobile-ikigai-info">
                    <div className="ikigai title">
                        <h3>{questions[currentQuestion].title}</h3>
                    </div>
                    <div className="ikigai explanation">
                        <p>{questions[currentQuestion].description}</p>
                    </div>
                    <div className="ikigai questions">
                        <ul className="question-list">
                            {
                                questions[currentQuestion].questions.map(question => (
                                    <li className="question"><span>{question}</span></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
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
