import React from 'react';
import '../styles/AnimatedTextSlider.css';

interface AnimatedTextSliderProps {
  phrases: [string, string, string];
}

export function AnimatedTextSlider({ phrases }: AnimatedTextSliderProps) {
  const loopedPhrases = [...phrases, phrases[0]];

  return (
    <div className="animated-slider-container">
      <div className="animated-slider-viewport">
        <div className="animated-slider-list">
          {loopedPhrases.map((phrase, index) => (
            <div key={index} className="animated-slider-item">
              <span className="slider-item-index">
                {(index % phrases.length) + 1}
              </span>
              <span className="slider-item-text">
                {phrase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}