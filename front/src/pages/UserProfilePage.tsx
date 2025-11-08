import React, { useState } from "react";
import ProfileTab from "../components/profile-tab/ProfileTab";
import InstancesTab from "../components/instance-tab/InstancesTab";
import TrainingTab from "../components/training-tab/TrainingTab";
import "./UserProfile.css"


// @ts-ignore
enum Tabs {
    Profile = "Profile",
    Instances = "Instances",
    Training = "Training",
}

const ProfileDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Profile);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <p className="dashboard-header-text">Created for workers by workers</p>
                <button className="logout-btn">Log out</button>
            </div>

            <div className="dashboard-tabs">
                {Object.values(Tabs).map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === Tabs.Profile && <ProfileTab />}
            {activeTab === Tabs.Instances && <InstancesTab />}
            {activeTab === Tabs.Training && <TrainingTab />}
        </div>
    );
};

export default ProfileDashboard;
