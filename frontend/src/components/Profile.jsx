import { useState, useRef } from "react";
import { useAuth } from "../authContext.jsx";
import Loading from "../components/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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
    })
    const { currentUser, updateUserInfo } = useAuth();
    const nameRef = useRef();
    const descriptionRef = useRef();

    const handleClick = (field, ref) => {
        setIsEditing({
            ...isEditing,
            [ref]: !isEditing[ref]
        })

        if (isEditing[ref]) {
            console.log(field)
            field.current.focus();
        }
    }

    const handleInputChange = (name, query) => {
        setProfileFormData({
            ...profileFormData,
            [name]: query
        })
    }

    const handleProfileFormChange = async () => {
        const { firstName, lastName, description} = profileFormData
        await updateUserInfo(currentUser.id, firstName, lastName, description)
    }

    return (
        <div className="my-profile">
            <h1>Me</h1>
            <div className="profile-container">              
                <div className="personal-info">
                    <div className="profile-section my-info">
                        <header>
                            <h4>My Info</h4>
                            <FontAwesomeIcon icon={faEdit} className="edit-button" onClick={() => handleClick(nameRef, "name")} />
                        </header>
                        <div className="section-info personal-inputs">
                            <div className="info-field">
                                <label htmlFor="first-name">First Name: </label>
                                <input ref={nameRef} className="profile-input-field name" value={currentUser.first_name} disabled={!isEditing.name} onChange={e => handleInputChange("firstName", e.target.value)} />
                            </div>
                            <div className="info-field">
                                <label htmlFor="last-name">Last Name: </label>
                                <input className="profile-input-field name" value={currentUser.last_name} disabled={!isEditing.name} onChange={e => handleInputChange("lastName", e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="profile-section description">
                        <header>
                            <h4>Who I Am</h4>
                            <FontAwesomeIcon icon={faEdit} className="edit-button" onClick={() => handleClick(descriptionRef, "description")} />
                        </header>
                        <div className="section-info">
                            <div className="info-field">
                                <textarea ref={descriptionRef} rows="10" cols="49" value={currentUser.description} disabled={!isEditing.description} onChange={e => handleInputChange("description", e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {isEditing && <button className="button profile-button" onClick={() => handleProfileFormChange()}>Save</button>}
                </div>
                <div className="profile-info">
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