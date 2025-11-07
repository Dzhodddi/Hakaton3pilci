import { useState, useRef } from 'react'
import './App.css'

import { Button, PromptInput } from './Components'

function App() {

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  return (
    <>
      <section>
        <div className="header">
          <p>Created for workers by workers</p>
          <img className="logo" src="./logo.png"></img>
          <Button placeholder="Log in" onClick={handlePopup} />
        </div>
        <div className="base">
          <h1>
            Elevate your job experience with *company*
          </h1>
          <PromptInput 
            placeholder="Enter your profession or background to generate a new fascinating CV..."
          />
          <p>
            Say no more to frustration over writing a new CV.
          </p>
          <Button placeholder="Generate" onClick={empty} />
        </div>
      </section>
      <section>
        <dialog className="login-popup" ref={dialogRef}>
          <Button placeholder="X" onClick={handleClosePopup} />
          <h3>
            Log in using your Google account
          </h3>
          <Button placeholder="Google OAuth" onClick={empty} />
        </dialog>
      </section>
    </>
  )
}

function empty() {
  console.log("empty");
}

export default App
