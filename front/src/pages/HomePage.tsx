import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { PromptInput } from '../components/PromptInput';
import { SparkleIcon } from '../components/SparkleIcon';
import Header from '../components/Header';
import { LoginPopup } from '../components/LoginPopup';

import '../styles/homepage.css';

export default function HomePage() {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handlePopup() {
    setIsPopupOpen(true);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  const navigate = useNavigate();

  function skipLogin() {
    navigate('/newprofile');
  }

  let isLogged = false;

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
          />
          <p className='description'>
            Say no more to frustration over writing a new CV
          </p>
          <Button variant="solid" color="primary" iconLeft={<SparkleIcon className="sparkle-icon" />}>Generate</Button>
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