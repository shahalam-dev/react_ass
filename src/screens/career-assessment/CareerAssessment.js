import React, { useState } from "react";
import "./CareerAssessment.css"; // Link to the CSS file

const questions = [
  {
    question: "Do you enjoy working with numbers and data?",
    options: ["Yes", "No", "Sometimes"],
    category: "Analytical",
  },
  {
    question: "Do you like solving complex problems?",
    options: ["Yes", "No", "Sometimes"],
    category: "Analytical",
  },
  {
    question: "Do you enjoy helping people with their problems?",
    options: ["Yes", "No", "Sometimes"],
    category: "Social",
  },
  {
    question: "Do you like organizing events or activities?",
    options: ["Yes", "No", "Sometimes"],
    category: "Organizational",
  },
  {
    question: "Do you prefer working in a team over working alone?",
    options: ["Yes", "No", "Sometimes"],
    category: "Social",
  },
  {
    question: "Do you enjoy being creative or artistic?",
    options: ["Yes", "No", "Sometimes"],
    category: "Creative",
  },
];

const CareerAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    const updatedResponses = [...responses, { ...questions[currentQuestion], answer }];
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setResponses(updatedResponses);
    } else {
      setResponses(updatedResponses);
      setShowResults(true);
    }
  };

  const getResults = () => {
    const score = {};
    responses.forEach(({ category, answer }) => {
      const points = answer === "Yes" ? 2 : answer === "Sometimes" ? 1 : 0;
      score[category] = (score[category] || 0) + points;
    });
    const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
    return sorted;
  };

  return (
    <div className="career-assessment-container">
      <div className="card">
        <div className="card-header">
          <h1>Career Assessment</h1>
          <p>Answer the questions to discover your career strengths.</p>
        </div>
        <div className="card-content">
          {!showResults ? (
            <>
              <div className="question-section">
                <h2>
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <p>{questions[currentQuestion].question}</p>
              </div>
              <div className="options-container">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    className="option-btn"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </>
          ) : (
            <>
              <div className="results-section">
                <h2>Your Career Traits</h2>
                <ul className="results-list">
                  {getResults().map(([category, points]) => (
                    <li key={category}>
                      <strong>{category}:</strong> {points} points
                    </li>
                  ))}
                </ul>
                <h3>Summary of Your Responses</h3>
                <ul className="responses-list">
                  {responses.map(({ question, answer }, index) => (
                    <li key={index}>
                      <strong>Q:</strong> {question} <br />
                      <strong>A:</strong> {answer}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="restart-btn"
                onClick={() => {
                  setCurrentQuestion(0);
                  setResponses([]);
                  setShowResults(false);
                }}
              >
                Restart Assessment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;