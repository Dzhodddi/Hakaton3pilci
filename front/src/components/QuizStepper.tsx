import React from 'react';
import '../styles/QuizStepper.css';

interface QuizStepProps {
  number: number;
  title: string;
  isActive: boolean;
}

const QuizStep: React.FC<QuizStepProps> = ({ number, title, isActive }) => {
  const stepClasses = `quiz-step ${isActive ? 'quiz-step--active' : ''}`;
  const circleClasses = `quiz-step-circle ${isActive ? 'quiz-step-circle--active' : 'quiz-step-circle--inactive'}`;

  return (
    <div className={stepClasses}>
      <div className={circleClasses}>
        {number}
      </div>
      {isActive && (
        <span className="quiz-step-title">{title}</span>
      )}
    </div>
  );
};

interface QuizStepperProps {
  currentStep: number;
  steps: string[];
}

export function QuizStepper({ currentStep, steps }: QuizStepperProps) {
  return (
    <nav className="quiz-stepper">
      {steps.map((title, index) => (
        <QuizStep
          key={index}
          number={index + 1}
          title={title}
          isActive={index + 1 === currentStep}
        />
      ))}
    </nav>
  );
}