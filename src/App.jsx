import React, { useState, useEffect, useRef } from 'react';
import  Result  from './components/Result/Result';
import Chart from './components/Chart/Chart';
import Typingtest from './components/Typingtest/Typingtest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle, faTruckPickup, faBicycle } from '@fortawesome/free-solid-svg-icons';
import './App.css';


const App = () => {
  const [selectedTime, setSelectedTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWPM] = useState(null);
  const [carType, setCarType] = useState("car"); // Default car type is "car"
    const vehicles = [
      { type: 'car', icon: faCar },
      { type: 'bike', icon: faMotorcycle },
      { type: 'jeep', icon: faTruckPickup },
      { type: 'cycle', icon: faBicycle },
    ];
  


  const handleCarTypeChange = (type) => {
    setCarType( type);
  };


  const [wpmData, setWpmData] = useState([]);

  const handleStart = (time) => {
    setSelectedTime(time);
    setIsTyping(true);
  };

  const handleFinish = () => {
    setIsTyping(false);
  };

  const handleRestart = () => {
    setWPM(null);
    setWpmData([]);
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
          wpmData = {wpmData}
          setWpmData ={setWpmData}
        />
      )}
      {selectedTime !== 0 && !isTyping && <Result wpm={wpm} onRestart={handleRestart} />}
      {selectedTime !== 0 && !isTyping && <Chart wpmData={wpmData} />}
      

{!isTyping && wpm === null && (
        <div className="vehicle-selector">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.type}
            className={`vehicle-button ${carType === vehicle.type ? 'selected' : ''}`}
            onClick={() => handleCarTypeChange(vehicle.type)}
          >
            <FontAwesomeIcon icon={vehicle.icon} size="2x" />
          </button>
        ))}
      </div>
    )}

    </div>
  );
};

export default App;
