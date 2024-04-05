import React, { useState, useEffect, useRef } from 'react';
import  Result  from './components/Result/Result';
import Typingtest from './components/Typingtest/Typingtest';
const App = () => {
  const [selectedTime, setSelectedTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWPM] = useState(null);

  const handleStart = (time) => {
    setSelectedTime(time);
    setIsTyping(true);
  };

  const handleFinish = () => {
    setIsTyping(false);
  };

  const handleRestart = () => {
    setWPM(null);
    setSelectedTime(0);
  };

  return (
    <div className="container">
      <h1>Typing Test</h1>
      {!isTyping && wpm === null && (
        <div className="timer-options">
          <button onClick={() => handleStart(15)}>15s</button>
          <button onClick={() => handleStart(30)}>30s</button>
          <button onClick={() => handleStart(60)}>60s</button>
        </div>
      )}
      {isTyping && (
        <Typingtest
          timerDuration={selectedTime}
          onReset={() => setIsTyping(false)}
          onFinish={handleFinish}
          setWPM={setWPM}
          wpm={wpm}
        />
      )}
      {selectedTime !== 0 && !isTyping && <Result wpm={wpm} onRestart={handleRestart} />}
      <style jsx>{`
        .container {
          background-color: #f8f9fa;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          font-family: 'Arial', sans-serif;
        }
        h1 {
          color: #007bff;
          margin-bottom: 20px;
        }
        .timer-options {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        button {
          padding: 8px 16px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default App;
