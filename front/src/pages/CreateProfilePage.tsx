import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { Step } from '../components/Step';
import { PromptInput } from '../components/PromptInput';
import { Button } from '../components/Button';
import { useAuth } from "../context/auth_context";

export default function CreateProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // const [form, setForm] = useState({
    //     name: "",
    //     title: "",
    //     description: "",
    // });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        navigate("/");
    }

    if (!user) return <p>Loading user info...</p>;
    function empty() {
        console.log("empty");
    }


    function cancelCreation() {
        navigate('/');
    }

    let isLogged = true;

    return (
        <>
            <section>
                <Header handler={cancelCreation} isLogged={isLogged}/>
            </section>
            <section>
                <div className="steps">
                    <Step index={1} placeholder='Tell us about yourself' active={true} />
                    <Step index={2} placeholder='Select your plan' active={false} />
                    <Step index={3} placeholder='Payment' active={false} />
                </div>
                <div className="inputs">
                    <PromptInput placeholder='Name' />
                    <PromptInput placeholder='Occupation' />
                    <PromptInput placeholder='Education' />
                    <PromptInput placeholder='Experience' />
                </div>
                <Button onClick={empty} children={<p>Next</p>} />
            </section>
        </>
    );
}