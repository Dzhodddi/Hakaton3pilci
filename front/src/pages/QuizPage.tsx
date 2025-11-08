import Header from "../components/Header";
import { QuizStepper } from "../components/QuizStepper";

import '../styles/QuizPage.css'

export function QuizPage() {
    function empty() {
        console.log("empty");
    }

    return (
        <>
            <section>
                <Header handler={empty} isLogged={true} />
                <div>
                    <QuizStepper currentStep={1} steps={["Basic communication", "Something", "Something", "Something", "Something"]} />
                </div>
            </section>
        </>
    );
}