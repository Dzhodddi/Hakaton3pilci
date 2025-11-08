import { DashboardNav } from "../components/DashboardNavProps";
import Header from "../components/Header";
import { KeywordList } from "../components/KeywordList";
import { PromptTextArea } from "../components/PromptTextArea";

import '../styles/EditInstancePage.css'

export default function EditInstancePage() {
    function empty() {
        console.log("empty");
    }

    return (
        <>
            <section className="dashboard">
                <div>
                    <Header handler={empty} isLogged={true} />
                </div>
                <div>
                    <DashboardNav activeView="Instances" onNavClick={empty} />
                </div>
                <div className="keywords">
                    <p className="naming">Keywords of the instance</p>
                    <KeywordList keywords={["IT", "Web Dev", "Front-end"]} onAddClick={empty}/>
                </div>
                <div className="wrapper">
                    <div className="prompt-inputs">
                        <PromptTextArea id="Skills" title="Skills" placeholder="Enter more details about your skills (ex. React proficiency, Communication, etc.)..." />
                        <PromptTextArea id="Experience" title="Experience" placeholder="Enter more details about your skills (ex. React proficiency, Communication, etc.)..." />
                        <PromptTextArea id="Education" title="Education" placeholder="Enter more details about your skills (ex. React proficiency, Communication, etc.)..." />
                        <PromptTextArea id="Additional" title="Additional" placeholder="Enter more details about your skills (ex. React proficiency, Communication, etc.)..." />
                    </div>
                    <div className="cv-check">
                        
                    </div>
                </div>
            </section>
        </>
    );
}