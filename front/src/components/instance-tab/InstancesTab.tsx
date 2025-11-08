import React from "react";
import "./InstancesTab.css";

const InstancesTab: React.FC = () => (
    <div className="instances-wrapper">
        <div className="instance-card"></div>
        <div className="instance-card">
            <p className="instance-text">Generate new instance...</p>
        </div>
        <div className="instance-card"></div>
    </div>
);

export default InstancesTab;
