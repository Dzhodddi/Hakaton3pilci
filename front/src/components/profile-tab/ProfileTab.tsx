import React from "react";
import "./ProfileTab.css";
import {useAuth} from "../../context/auth_context.tsx";

const ProfileTab: React.FC = () => {
    const { user } = useAuth();

    const renderTagList = (title: string) => (
        <div className="profile-section">
            <h3 className="profile-section-title">{title}</h3>
            <div className="profile-tags">
                {["IT", "Web development", "Front-end", "Skilled"].map((tag) => (
                    <span key={tag} className="profile-tag">{tag}</span>
                ))}
                <button className="profile-tag add">+</button>
            </div>
        </div>
    );

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="avatar" />
                <h2 className="profile-name">Volodymyr Stepanov</h2>
                <p className="profile-desc">Enter description...</p>
            </div>

            <div className="profile-right">
                <div className="profile-box">
                    <h4>Your e-mail:</h4>
                    <div className="placeholder">{user?.email}</div>
                </div>

                <div className="profile-box">
                    <h4>Your socials:</h4>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                    <div className="placeholder"></div>
                </div>

                {renderTagList("Your positions")}
                {renderTagList("Your skills")}
                {renderTagList("Your education")}

                <button className="delete-btn">Delete my account</button>
            </div>
        </div>
    );
};

export default ProfileTab;
