import React from 'react';
import '../styles/PromptTextArea.css';

interface PromptTextAreaProps {
  id: string;
  title: string;
  placeholder: string;
}

export function PromptTextArea({ id, title, placeholder }: PromptTextAreaProps) {
  return (
    <div className="prompt-textarea-wrapper">
      <label htmlFor={id} className="prompt-textarea-title">
        {title}
      </label>
      <textarea
        id={id}
        className="prompt-textarea-input"
        placeholder={placeholder}
        rows={5}
      />
    </div>
  );
}