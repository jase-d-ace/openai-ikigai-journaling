import { useAuth } from "../authContext.jsx";
import "../App.css";

export default function Profile() {
    const { currentUser } = useAuth();

    return (
        <div className="my-profile">
            <h1>Me</h1>
            <div className="profile-container">              
                <div className="personal-info">
                    <div className="profile-section my-info">
                        my info
                    </div>
                </div>
                <div className="profile-info">
                    <div className="profile-section description">
                        description
                    </div>
                    <div className="profile-section gpt-analysis">
                        gpt-analysis
                    </div>
                </div>
            </div>
        </div>
    )
}