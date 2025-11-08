import { useState } from 'react';
import '../styles/Quiz.css';

const questions = [
    {
        id: 1,
        title: "Basic Communication",
        question: "What does 'HTTP' stand for?",
        options: [
            "HyperText Transfer Protocol",
            "High-Text Transfer Protocol",
            "HyperText Transmission Process",
            "Hyperlink Text Transfer Protocol"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        title: "Programming",
        question: "Which of these is a compiled programming language?",
        options: [
            "JavaScript",
            "Python",
            "C++",
            "PHP"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        title: "Hardware",
        question: "What is the main function of a 'CPU'?",
        options: [
            "Store data long-term",
            "Execute instructions and perform calculations",
            "Render graphics to the screen",
            "Connect to the internet"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        title: "Databases",
        question: "What does 'SQL' stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "Server-Side Query Logic",
            "System Query Link"
        ],
        correctAnswer: 0
    },
    {
        id: 5,
        title: "DevOps",
        question: "What is 'Git' primarily used for?",
        options: [
            "Writing code",
            "Version control and tracking changes",
            "Deploying applications to a server",
            "Testing website performance"
        ],
        correctAnswer: 1
    }
];

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex) => {
        setSelectedAnswer(optionIndex);
    };

    const handleNextClick = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswer(null);
        } else {
            setShowResult(true);
        }
    };

    const handleRestartClick = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        return (
            <div className="quiz-container">
                <div className="result-screen">
                    <h2>Quiz Completed!</h2>
                    <p>Your score is: {score} out of {questions.length}</p>
                    <button onClick={handleRestartClick} className="next-btn">
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <header className="quiz-header">
                <div className="header-left">
                    <h1>Desktop - Training Quiz</h1>
                    <p>Created for workers by workers</p>
                </div>
                <div className="header-right">
                    <a href="#" className="logout-btn">Log out</a>
                </div>
            </header>

            <div className="progress-bar">
                {questions.map((q, index) => (
                    <div
                        key={q.id}
                        className={`step-item ${index === currentQuestionIndex ? 'active' : ''} ${index < currentQuestionIndex ? 'completed' : ''}`}
                    >
                        <div className="step-circle">{index + 1}</div>
                        {index === currentQuestionIndex && (
                            <span className="step-label">{q.title}</span>
                        )}
                    </div>
                ))}
                <div className={`step-item ${showResult ? 'active' : ''}`}>
                    <div className="step-circle result-step">Result</div>
                </div>
            </div>

            <div className="question-content">
                <div className="question-visual-box">
                </div>
                <p className="question-text">
                    {currentQuestion.question}
                </p>
            </div>

            <div className="answer-options">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`answer-btn ${selectedAnswer === index ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(index)}
                    >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        {option}
                    </button>
                ))}
            </div>

            {selectedAnswer !== null && (
                <button onClick={handleNextClick} className="next-btn">
                    Next <span>&rarr;</span>
                </button>
            )}
        </div>
    );
}

export default Quiz;