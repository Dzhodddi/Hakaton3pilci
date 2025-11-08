import React, { useEffect, useState } from "react";
import type {PromptResponse} from "../api/prompt_api.ts";


export const CVTemplate: React.FC<PromptResponse> = ({ response }) => {
    const { summary, experience, skills } = response;
    const [typedSummary, setTypedSummary] = useState("");
    useEffect(() => {
        let index = 0;
        setTypedSummary("");

        const interval = setInterval(() => {
            setTypedSummary(summary.slice(0, index + 1));
            index++;
            if (index >= summary.length) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, [summary]);

    return (
        <div style={{ fontFamily: "Arial", maxWidth: "600px", minWidth: "500px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>Your CV</h2>

            <section>
                <h3>Summary:</h3>
                <p>{typedSummary}</p>
            </section>

            <section>
                <h3>Experience:</h3>
                {experience.length > 0 ? (
                    <ul>
                        {experience.map((exp, i) => (
                            <li key={i}>
                                {exp}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "gray" }}>No experience listed.</p>
                )}
            </section>

            <section>
                <h3>Skills:</h3>
                {skills.length > 0 ? (
                    <ul>
                        {skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: "gray" }}>No skills listed.</p>
                )}
            </section>
        </div>
    );
};
