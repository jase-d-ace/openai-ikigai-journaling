import { useState } from "react";
import { useAuth } from "../authContext.jsx";
import Loading from "../components/Loading.jsx";
import "../App.css";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useAuth();

    return (
        <div className="my-profile">
            <h1>Me</h1>
            <div className="profile-container">              
                <div className="personal-info">
                    <div className="profile-section my-info">
                        <header>
                            <h4>My Info</h4>
                        </header>
                        <div className="section-info">
                            <div className="info-field">
                                <label htmlFor="first-name">First Name: </label>
                                <input className="profile-input-field name" value={currentUser.first_name || ""} disabled={!isEditing} />
                            </div>
                            <div className="info-field">
                                <label htmlFor="last-name">Last Name: </label>
                                <input className="profile-input-field name" value={currentUser.last_name || ""} disabled={!isEditing} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-section description">
                        <header>
                            <h4>Who I Am</h4>
                        </header>
                        <div className="section-info">
                            <div className="info-field">
                                <textarea rows="10" cols="49" value={currentUser.description || ""} disabled={!isEditing} />
                            </div>
                        </div>
                    </div>
                    <div className="profile-section gpt-analysis">
                        <header>
                            <h4>What GPT thinks of me</h4>
                        </header>
                        <div className="section-info">
                            <Loading />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}