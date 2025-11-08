import React from "react";
import "./TrainingTab.css";

const TrainingTab: React.FC = () => (
    <div className="training-wrapper">
        <div className="training-sidebar">
            <p className="training-sidebar-text">General interview questions</p>
        </div>
        <div className="training-content">
            <h2 className="training-title">
                Be ready to your next interview <br />
                with developed quizzes just for you
            </h2>
            <p className="training-subtitle">New quizzes are coming soon...</p>
        </div>
    </div>
);

export default TrainingTab;
