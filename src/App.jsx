import React, { useState, useEffect, useRef } from 'react';
import  Result  from './components/Result/Result';
import Chart from './components/Chart/Chart';
import Typingtest from './components/Typingtest/Typingtest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle, faTruckPickup, faBicycle } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './logo.svg';
import { faClock } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [selectedTime, setSelectedTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWPM] = useState(null);
  const [carType, setCarType] = useState("car"); // Default car type is "car"
  const [themeOptionsVisible, setThemeOptionsVisible] = useState(false); // State to toggle theme options visibility
  const [selectedTheme, setSelectedTheme] = useState('Black');
  const [caps, setCaps] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [punctuation, setPunctuaions] = useState(false);

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
    localStorage.setItem('wpmData', JSON.stringify(wpmData));
  };

  const handleThemeSelect = (themeColor) => {
    setSelectedTheme(themeColor);
    setThemeOptionsVisible(false);
    // Apply theme color to the application or store it in localStorage for persistence
  };

  const toggleThemeOptions = () => {
    setThemeOptionsVisible(!themeOptionsVisible);
  };
  const themeOptions = [
    { name: 'Blue', primary: '#000236', secondary: '#00356e' },
    { name: 'Orange', primary: '#2a1300', secondary: '#502400' },
    { name: 'Green', primary: '#052700', secondary: '#093d00' },
    { name: 'Black', primary: '#242424', secondary: '#424242' },
  ];

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className={`container ${selectedTheme}`}>
 <nav className={`navbar ${selectedTheme}-secondary`}>
        <div className="logo">
          {/* <svg src='./logo.svg'></svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none">
<path d="M64 16C64 5.33333 58.6667 0 48 0H16C5.33333 0 0 5.33333 0 16V48C0 58.6667 5.33333 64 16 64H48C58.6667 64 64 58.6667 64 48" fill="#323437"/>
<path d="M56 25.1L53.36 50.5L50.88 46.3V34.1C50.7093 31.0267 49.216 29.49 46.4 29.49C44.0933 29.746 42.94 31.026 42.94 33.33V46.23L40.36 50.5L37.82 46.23V34.73C37.9053 31.23 36.412 29.48 33.34 29.48C31.0333 29.736 29.88 31.016 29.88 33.32V46.22L28 48L26.38 50V27.85C26.38 21.5367 26.3967 19.9 31.09 19.9C33.9033 19.9 36.96 25.7033 38.84 28.01C40.2933 25.7033 42.3 24.55 44.86 24.55C47.1667 24.55 49.1733 25.36 50.88 26.98L53.09 28.01M18.09 9.5L17.86 25.5L22.7 25.02V30.14L18.09 28.7372V46.24L12.36 55.5L13.36 29L8.36 30.14V25.02L13.36 25.5L12.97 19.9" fill="#E2B714"/>
</svg>
           { !isMobile && <span className="typemeter-logo">Typemeter</span>}
        </div>

      {!isTyping && wpm === null && (
        <div className="game-options">
            <FontAwesomeIcon icon={faClock} size="2x" />
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
            
              {themeOptions.map((theme) => (
                <div key={theme} className={`theme-option ${theme.name}`} onClick={() => handleThemeSelect(theme.name)}></div>
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
          themeColor={selectedTheme}
          caps = {caps}
          punctuations={punctuation}
          numbers={numbers}
        />
      )}
      {selectedTime !== 0 && !isTyping && <Result wpm={wpm} onRestart={handleRestart} themeColor ={selectedTheme}/>}
      {selectedTime !== 0 && !isTyping && <Chart wpmData={wpmData}  themeColor ={selectedTheme}/> }
      

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
      {!isTyping && wpm === null && (
        <div className="game-options">
          <button onClick={() => setNumbers(!numbers)} className={`${numbers?"selected":""}`}>Numbers</button>
          <button onClick={() => setCaps(!caps)} className={`${caps?"selected":""}`}>Capitals</button>
          <button onClick={() => setPunctuaions(!punctuation)} className={`${punctuation?"selected":""}`}>Punctuaions</button>
        </div>
      )}
    {!isTyping && wpm === null && (
      <span className='info'>Choose time to start</span>
    )}
    </div>
  );
};

export default App;
