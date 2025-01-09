import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";
import Loading from "../components/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import "../App.css";

export default function Profile() {
    const [isEditing, setIsEditing] = useState({
        name: false,
        description: false
    });
    const [profileFormData, setProfileFormData] = useState({
        firstName: "",
        lastName: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const [gptResponse, setGptResponse] = useState("");

    useEffect(() => {
        if (isEditing.name) {
            nameRef.current.select();
        }

        if (isEditing.description) {
            descriptionRef.current.select();
        }
    }, [isEditing])
    const { currentUser, updateUserInfo } = useAuth();
    const nameRef = useRef();
    const descriptionRef = useRef();

    const handleClick = (ref) => {
        setIsEditing({
            ...isEditing,
            [ref]: !isEditing[ref]
        })
    }

    const handleInputChange = (name, query) => {
        setProfileFormData({
            ...profileFormData,
            [name]: query
        })
    }

    const handleProfileFormChange = async () => {
        const { firstName, lastName, description} = profileFormData
        await updateUserInfo(currentUser.user.id, localStorage.getItem("user_token"), firstName, lastName, description)
        setIsEditing({
            name: false,
            description: false
        })
    }

    const fetchGPTResponse = async () => {
        setLoading(true);

        const gptRes = await fetch(`http://localhost:8000/users/generate-gpt?id=${currentUser.user.id}`);
        const gptJson = await gptRes.json();

        setGptResponse(gptJson.analysis);
        setLoading(false);
    }

    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-container">              
                <div className="personal-info">
                    <div className="profile-section my-info">
                        <header>
                            <h4>My Info</h4>
                            <FontAwesomeIcon icon={faEdit} className="edit-button" onClick={() => handleClick("name")} />
                        </header>
                        <div className="section-info personal-inputs">
                            <div className="info-field">
                                <label htmlFor="first-name">First Name: </label>
                                <input ref={nameRef} className="profile-input-field name" value={currentUser.user.first_name} disabled={!isEditing.name} onChange={e => handleInputChange("firstName", e.target.value)} />
                            </div>
                            <div className="info-field">
                                <label htmlFor="last-name">Last Name: </label>
                                <input className="profile-input-field name" value={currentUser.user.last_name} disabled={!isEditing.name} onChange={e => handleInputChange("lastName", e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="profile-section description">
                        <header>
                            <h4>Who I Am</h4>
                            <FontAwesomeIcon icon={faEdit} className="edit-button" onClick={() => handleClick("description")} />
                        </header>
                        <div className="section-info">
                            <div className="info-field">
                                <textarea className="profile-input-field" ref={descriptionRef} rows="10" cols="49" value={currentUser.user.description} disabled={!isEditing.description} onChange={e => handleInputChange("description", e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="profile-section journal-count">
                        <header>
                            <h4>Ikigai Journeys Taken</h4>
                        </header>
                        <div className="section-info">
                            <div className="info-field">
                                <label htmlFor="journal-count">Total Journals: </label>
                                <input className="profile-input-field name" disabled value={currentUser.user.journal_count} />
                            </div>
                        </div>
                    </div>
                    {(isEditing.name || isEditing.description) && <button className="profile-button" onClick={() => handleProfileFormChange()}>Save</button>}
                </div>
                <div className="profile-info">
                    <div className="profile-section gpt-analysis">
                        <header>
                            <h4>What GPT thinks of me</h4>
                        </header>
                        <div className="section-info gpt-field">
                            {loading && <Loading />}
                            {gptResponse && <Markdown>{gptResponse}</Markdown>}
                            {!gptResponse && <button className="profile-button" onClick={() => fetchGPTResponse()}>Get Graded</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}