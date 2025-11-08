import '../styles/PromptInput.css';
import React from "react";

interface PromptInputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any
}

export function PromptInput({ placeholder, onChange, value }: PromptInputProps) {
  return (
    <input
      type="text"
      className="prompt-input"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}