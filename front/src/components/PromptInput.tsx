import '../styles/PromptInput.css';
import React from "react";

interface PromptInputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PromptInput({ placeholder, onChange }: PromptInputProps) {
  return (
    <input
      type="text"
      className="prompt-input"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}