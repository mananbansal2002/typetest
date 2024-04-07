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
  const [themeOptionsVisible, setThemeOptionsVisible] = useState(false); // State to toggle theme options visibility
  const [selectedTheme, setSelectedTheme] = useState('');
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

  const handleThemeSelect = (themeColor) => {
    setSelectedTheme(themeColor);
    // Apply theme color to the application or store it in localStorage for persistence
  };

  const toggleThemeOptions = () => {
    setThemeOptionsVisible(!themeOptionsVisible);
  };
  const themeOptions = ['#333', '#444', '#555', '#666', '#777'];



  return (
    <div className="container">
 <nav className="navbar">
        <div className="logo">
          <span className="typemeter-logo">Typemeter</span>
        </div>

      {!isTyping && wpm === null && (
        <div className="timer-options">
          <button onClick={() => handleStart(15)}>15s</button>
          <button onClick={() => handleStart(30)}>30s</button>
          <button onClick={() => handleStart(60)}>60s</button>
        </div>
      )}
       <div className="theme-selector">
          <button className="theme-button" onClick={toggleThemeOptions}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
  <path fill="currentColor" d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
</svg>

       </button>
        </div>
        {/* Theme options */}
        {themeOptionsVisible && (
          <div className="theme-options-container">
            
              {themeOptions.map((color) => (
                <div key={color} className="theme-option" style={{ backgroundColor: color }} onClick={() => handleThemeSelect(color)}></div>
              ))}
           
          </div>
        )}
            </nav>
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
