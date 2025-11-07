import { useState } from 'react'
import './App.css'

import { Button, PromptInput } from './Components'

function App() {

  return (
    <>
      <section>
        <div className="header">
          <p>Created for workers by workers</p>
          <img className="logo" src="./logo.png"></img>
          <button>Log in</button>
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
          <Button placeholder="Generate" />
        </div>
      </section>
    </>
  )
}

export default App
