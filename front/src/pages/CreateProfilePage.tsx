import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { Step } from '../components/Step';
import { PromptInput } from '../components/PromptInput';
import { Button } from '../components/Button';
import { useAuth } from "../context/auth_context";
import {createUser} from "../api/user_api.ts";
import {useState} from "react";

import { QuizStepper } from '../components/QuizStepper';

import '../styles/CreateProfilePage.css';

export default function CreateProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        education: "",
        experience: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user?.email) return;
        const payload = {
            email: user!.email ,
            firstName: form.first_name,
            lastName: form.last_name,
            occupation: form.occupation || undefined,
            education: form.education || undefined,
            experience: form.experience || undefined,
            skills: undefined,
        };
        try {
            const result = await createUser(payload);
            if (result) {
                console.log( result);
                navigate("/");
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error(error);
        }
        navigate("/");
    }

    if (!user) return <p>Loading user info...</p>;

    function cancelCreation() {
        navigate('/');
    }

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    let isLogged = true;

    return (
        <>
            <section>
                <Header handler={cancelCreation} isLogged={isLogged}/>
                <QuizStepper currentStep={1} steps={["Tell us about yourself ", "-", "-"]} />
                <div className="inputs">
                    <PromptInput
                        placeholder="First name"
                        value={form.first_name}
                        onChange={e => handleChange("first_name", e.target.value)}
                    />
                    <PromptInput
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={e => handleChange("last_name", e.target.value)}
                    />
                    <PromptInput
                        placeholder="Occupation"
                        value={form.occupation}
                        onChange={e => handleChange("occupation", e.target.value)}
                    />
                    <PromptInput
                        placeholder="Education"
                        value={form.education}
                        onChange={e => handleChange("education", e.target.value)}
                    />
                    <PromptInput
                        placeholder="Experience"
                        value={form.experience}
                        onChange={e => handleChange("experience", e.target.value)}
                    />
                </div>
                <Button className='submit' onClick={handleSubmit} children={<p>Next</p>} />
            </section>
        </>
    );
}