import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Iridescence from '../components/Iridescence';

import { Button } from '../components/Button';
import { PromptInput } from '../components/PromptInput';
import { SparkleIcon } from '../components/SparkleIcon';
import Header from '../components/Header';
import { LoginPopup } from '../components/LoginPopup';

import '../styles/homepage.css';
import {getShortPrompt, type PromptResponse} from "../api/prompt_api.ts";
import {CVTemplate} from "../components/CVTemplate.tsx";
import { FeatureCard } from '../components/FeatureCard.tsx';

import Vector1 from '../assets/Vector-1.png';
import Vector2 from '../assets/Vector-2.png';
import Vector3 from '../assets/Vector-3.png';

import DotGrid from '../components/DotGrid.tsx';
import { AnimatedTextSlider } from '../components/AnimatedTextSlider.tsx';
import DarkVeil from '../components/DarkVeil.tsx';

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  let isLogged = false;
  const isValid = inputText.trim().length >= 12

  return (
    <>
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
      <section id='base'>
        <Header handler={handlePopup} isLogged={isLogged}/>
        <div className="base">
          <h1>
            Level up your CV with zeroka.ai
          </h1>
          <PromptInput 
            placeholder="Enter your profession or background to generate a new fascinating CV..."
            onChange={(e) => setInputText(e.target.value)} value={undefined} />
          <p className='description'>
            Say no more to frustration over writing a new CV
          </p>
          <Button variant="solid" onClick={handleGenerate} color="secondary" iconLeft={<SparkleIcon className="sparkle-icon"/>}>Generate</Button>
          {!isValid && inputText.length > 0 && (
              <p style={{ color: "red" }}>Input must be at least 12 characters long.</p>
          )}
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
      <section id='second'>
          <div className="second-wrap">
            <h1>What is zeroka?</h1>
            <div className="feature-list">
              <FeatureCard text='Helps you achieve 
  your dream career goals' icon={Vector1} />
              <FeatureCard text='Powered by latest 
  models of Artificial Intelligence' icon={Vector2} />
              <FeatureCard text='Boosts your CVs
  up to the unseen heights' icon={Vector3} />
            </div>
            <p className='feature-explain'>Our team put dedication to create service which helps you become better</p>
          </div>
      </section>
      <section id="third">
        <div className="third-wrap">
          <h1>How it works?</h1>
          <div className="panel-wrapper">
            <DotGrid />
            <AnimatedTextSlider phrases={["Prompt occupation", "Get generated CV", "Improve with prompts"]} />
          </div>
          <p className='feature-explain'>Simple process yet impressive result just for you</p>
        </div>
      </section>
      <DarkVeil />
      <section id="fourth">
        <div className="fourth-wrap">
          <h1>Try it out yourself for free</h1>
          <div className="prompt-wrap">
            <PromptInput 
            placeholder="Enter your profession or background to generate a new fascinating CV..."
            value={undefined}
            />
            <Button onClick={handleScrollToTop} variant='solid' color='secondary' iconLeft={<SparkleIcon />}>Generate</Button>
          </div>
          <p className='credits'>© 2025 3pilci Team</p>
        </div>
      </section>
    </>
  );
}