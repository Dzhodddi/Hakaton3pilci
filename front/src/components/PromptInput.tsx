import '../styles/PromptInput.css';

interface PromptInputProps {
  placeholder: string;
}

export function PromptInput({ placeholder }: PromptInputProps) {
  return (
    <input
      type="text"
      className="prompt-input"
      placeholder={placeholder}
    />
  );
}