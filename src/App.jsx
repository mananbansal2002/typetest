import React, { useState, useEffect, useRef } from 'react';
import  Result  from './components/Result/Result';
import Typingtest from './components/Typingtest/Typingtest';
import './App.css';
const App = () => {
  const [selectedTime, setSelectedTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWPM] = useState(null);
  const [carType, setCarType] = useState("car"); // Default car type is "car"

  const handleCarTypeChange = (event) => {
    setCarType(event.target.value);
  };




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
          carType = {carType}
        />
      )}
      {selectedTime !== 0 && !isTyping && <Result wpm={wpm} onRestart={handleRestart} />}
      

{!isTyping && wpm === null && (
        <div className="dropdown">
        <select value={carType} onChange={handleCarTypeChange}>
          <option value="car">&#x1F697;</option> {/* Car icon */}
          <option value="jeep">&#x1F699;</option> {/* Jeep icon */}
          <option value="bike">&#x1F3CD;</option> {/* Bike icon */}
        </select>
        <span className="arrow"></span>
      </div>
    )}

    </div>
  );
};

export default App;
