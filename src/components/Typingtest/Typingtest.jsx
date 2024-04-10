import React, { useState, useEffect, useRef } from 'react';

import  SpeedBar  from "../Speedbar/Speedbar";
import "./Typingtest.css"; 
import { generateAdvancedWordsSet } from '../utils/GenerateWords';

 const Typingtest = ({ timerDuration, onReset, onFinish, setWPM, wpm, carType,wpmData, setWpmData, themeColor, caps,punctuations,numbers }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedWords, setTypedWords] = useState([]);
  const [isBlurred, setIsBlurred] = useState(true);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timerDuration);
  const [startTime, setStartTime] = useState(null);
  const [carPosition, setCarPosition] = useState(0);
 

  const divRef = useRef(null);
  
  const generateWords = () => {
    
const options = {
  caps: caps,
  numbers: numbers,
  punctuation: punctuations,
};
    setWords(generateAdvancedWordsSet(50, options));
    setTypedWords(new Array(50).fill(''));
  };

  useEffect(() => {
    generateWords();
  }, []);

  useEffect(() => {
    
    if (!isNaN(wpm) && wpm!=null) 
    setWpmData([...wpmData, { time: timerDuration-timeRemaining, wpm: wpm }]);
    else 
    setWpmData([...wpmData, { time: timerDuration-timeRemaining, wpm: 0 }]);
    // console.log(wpmData);
  }, [timeRemaining]);

  useEffect(() => {
    if (wpm !== null && timeRemaining === 0)
      onFinish(wpm);
  }, [timeRemaining, wpm]);

  useEffect(() => {
    calculateWPM(setWPM, wpm, correctWordsCount);
    if (timeRemaining === 0) {
      setIsBlurred(true);
      calculateWPM(setWPM, wpm, correctWordsCount);
    } else {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
        setCarPosition(prevPosition => (wpm || 0));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const handleInput = (event) => {
    if (isBlurred) return;
    handleAllKeyPress(event.target.value);
    event.target.value="";
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    handleAllKeyPress(key);
  };

  const handleAllKeyPress =(key)=> {
    
    if (startTime === null) {
      setStartTime(Date.now());
    }
    if (key === ' ' && typedWords[currentIndex] !== '') {
      if (typedWords[currentIndex] === words[currentIndex]) {
        setCorrectWordsCount(prevCount => prevCount + 1);
      }
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, words.length - 1));
    } else if (key === 'Backspace') { // Handle backspace key
      if (typedWords[currentIndex].length > 0) {
        // Remove the last character from the current word
        const updatedWords = typedWords.map((word, idx) =>
          idx === currentIndex ? word.slice(0, -1) : word
        );
        setTypedWords(updatedWords);
      } else if (currentIndex > 0) {
        // Move to the previous word if the current word is empty
        setCurrentIndex(prevIndex => prevIndex - 1);
      }
    } else if (key.length === 1) {
      // Append the typed character to the current word
      const updatedWords = typedWords.map((word, idx) =>
        idx === currentIndex ? word + key : word
      );
      setTypedWords(updatedWords);
    }
    calculateWPM(setWPM, wpm, correctWordsCount);
  }

  

  const renderWord = (word, index) => {
    if (index < currentIndex) {
      return word.split('').map((char, charIndex) => (
        <span key={charIndex} className={typedWords[index][charIndex] === char ? 'correct' : 'incorrect'}>{char}</span>
      ));
    } else if (index === currentIndex) {
      return word.split('').map((char, charIndex) => (
        <span key={charIndex} className={charIndex < typedWords[index].length ? (typedWords[index][charIndex] === char ? 'correct' : 'incorrect') :charIndex === typedWords[index].length?'crnt': 'pending'}>{char}</span>
      ));
    } else {
      return <span key={index} className="future">{word}</span>;
    }
  };

  const calculateWPM = (setWPM, wpm, correctWordsCount) => {
    
    const timeInSeconds = (timerDuration  - timeRemaining);
    // console.log(timeInSeconds);
    const wpmValue = Math.round((correctWordsCount / timeInSeconds) * 60);
    setWPM(wpmValue);
  };
  const handleReset = () => {
    setCurrentIndex(0);
    setWpmData([]);
    setTypedWords(new Array(10).fill(''));
    setTimeRemaining(timerDuration);
    setStartTime(null);
    setWPM(null);
    onReset();
  };
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <div
      className={`typing-box ${isBlurred ? 'blurred' : ''} ${themeColor}-secondary`}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onFocus={() => setIsBlurred(false)}
      onBlur={() => setIsBlurred(true)}
      ref={divRef}
    >
      {isMobile&& <input className='mobile-input'  tabIndex="0"
      onChange={handleInput}
      onFocus={() => setIsBlurred(false)}
      onBlur={() => setIsBlurred(true)}
      ></input>}
      <div className={  `timer ${themeColor}`}>{timeRemaining}</div>
      <div className="content">
        {words.map((word, index) => (
          <span key={index} className={index === currentIndex ? 'current-word' : ''}>
            {renderWord(word, index)}{' '}
          </span>
        ))}
      </div>
    

{timeRemaining > 0 &&<SpeedBar speed={carPosition} carType={carType} />}



    </div>
  );
};

export default Typingtest