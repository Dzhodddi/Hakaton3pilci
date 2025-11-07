import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Header from '../components/Header';
import { Step } from '../components/Step';
import { PromptInput } from '../components/PromptInput';
import { Button } from '../components/Button';

export default function CreateProfilePage() {
    function empty() {
        console.log("empty");
    }

    const navigate = useNavigate();

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
                <Button placeholder='Next' onClick={empty} />
            </section>
        </>
    );
}