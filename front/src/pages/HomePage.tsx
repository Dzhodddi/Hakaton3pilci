import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { PromptInput } from '../components/PromptInput';
import { SparkleIcon } from '../components/SparkleIcon';
import Header from '../components/Header';
import { LoginPopup } from '../components/LoginPopup';

import '../styles/homepage.css';
import {getShortPrompt, type PromptResponse} from "../api/prompt_api.ts";
import {CVTemplate} from "../components/CVTemplate.tsx";

export default function HomePage() {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<PromptResponse | null>(null);

  function handlePopup() {
    setIsPopupOpen(true);
  }

  const handleGenerate = async () => {
    if (inputText.trim().length < 12 || inputText.trim().startsWith('Unable') ) {
      return
    }
    setLoading(true);
    try {
      const data = await getShortPrompt(inputText);
      if (data) {
        setPrompt(data)
        setInputText("")
      }
    } catch (err) {
      setInputText("")
    } finally {
      setLoading(false);
    }
  };

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  const navigate = useNavigate();

  function skipLogin() {
    navigate('/newprofile');
  }

  let isLogged = false;
  const isValid = inputText.trim().length >= 12

  return (
    <>
      <section id='base'>
        <Header handler={handlePopup} isLogged={isLogged}/>
        <div className="base">
          <h1>
            Level up your CV with zeroka.ai
          </h1>
          <PromptInput 
            placeholder="Enter your profession or background to generate a new fascinating CV..."
            onChange={(e) => setInputText(e.target.value)}
          />
          <p className='description'>
            Say no more to frustration over writing a new CV
          </p>
          <Button disabled={loading || inputText.trim().length < 12} variant="solid" onClick={handleGenerate} color="primary" iconLeft={<SparkleIcon className="sparkle-icon"/>}>Generate</Button>
          {!isValid && inputText.length > 0 && (
              <p style={{ color: "red" }}>Input must be at least 12 characters long.</p>
          )}
          <p>Say no more to frustration over writing a new CV.</p>
          {prompt && (
              <CVTemplate response={prompt.response} ></CVTemplate>
          )}
        </div>
      </section>
      <section>
        <LoginPopup 
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onGoogleLogin={skipLogin} 
        />
      </section>
    </>
  );
}