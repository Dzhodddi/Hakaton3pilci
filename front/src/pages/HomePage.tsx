import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button'
import { PromptInput } from '../components/PromptInput'
import { SparkleIcon } from '../components/SparkleIcon';
import Header from '../components/Header';

import '../styles/homepage.css'

export default function HomePage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
  
  function empty() {
    console.log("empty");
  }

  function handlePopup() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function handleClosePopup() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
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
        <dialog className="login-popup" ref={dialogRef}>
          <Button placeholder="X" onClick={handleClosePopup} />
          <h3>
            Log in using your Google account
          </h3>
          <Button placeholder="Google OAuth" onClick={skipLogin} />
        </dialog>
      </section>
    </>
  )
}