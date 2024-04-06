import React, { useState, useEffect, useRef } from 'react';

import  SpeedBar  from "../Speedbar/Speedbar";
 const Typingtest = ({ timerDuration, onReset, onFinish, setWPM, wpm, carType,wpmData, setWpmData }) => {
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
    const randomWords = [
      "man",
      "people",
      "last",
      "time",
      "come",
      "part",
      "around",
      "thing",
      "after",
      "if",
      "these",
      "want",
      "well",
      "he",
      "without",
      "never",
      "time",
      "back",
      "from",
      "than",
      "great",
      "about",
      "show",
      "few",
      "number",
      "know",
      "year",
      "first",
      "school",
      "tell",
      "all",
      "may",
      "what",
      "so",
      "there",
      "another",
      "around",
      "keep",
      "could",
      "get",
      "use",
      "in",
      "turn",
      "eye",
      "do",
      "see",
      "use",
      "only",
      "develop",
      "between",
      "govern",
      "only",
      "place",
      "right",
      "if",
      "more",
      "general",
      "some",
      "a",
      "part",
      "both",
      "govern",
      "we",
      "open",
      "group",
      "against",
      "from",
      "make",
      "word",
      "group",
      "own",
      "child",
      "plan",
      "feel",
      "may",
      "head",
      "turn",
      "stand",
      "early",
      "there",
      "great",
      "word",
      "follow",
      "under",
      "must",
      "they",
      "order",
      "house",
      "too",
      "also",
      "first",
      "how",
      "early",
      "point",
      "now",
      "what",
      "possible",
      "who",
      "system",
      "how"
  ];

    const selectedWords = randomWords.slice(0, 99);
    setWords(selectedWords);
    setTypedWords(new Array(selectedWords.length).fill(''));
  };

  useEffect(() => {
    generateWords();
  }, []);

  useEffect(() => {
    if (!isNaN(timerDuration - timeRemaining)) 
    setWpmData([...wpmData, { time: timerDuration-timeRemaining, wpm: wpm }]);
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

  const handleKeyDown = (e) => {
    if (isBlurred) return;
  
    const { key } = e;
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
  };

  

  const renderWord = (word, index) => {
    if (index < currentIndex) {
      return word.split('').map((char, charIndex) => (
        <span key={charIndex} className={typedWords[index][charIndex] === char ? 'correct' : 'incorrect'}>{char}</span>
      ));
    } else if (index === currentIndex) {
      return word.split('').map((char, charIndex) => (
        <span key={charIndex} className={charIndex < typedWords[index].length ? (typedWords[index][charIndex] === char ? 'correct' : 'incorrect') : 'pending'}>{char}</span>
      ));
    } else {
      return <span key={index} className="future">{word}</span>;
    }
  };

  const calculateWPM = (setWPM, wpm, correctWordsCount) => {
    
    const timeInSeconds = (timerDuration  - timeRemaining);
    console.log(timeInSeconds);
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

  return (
    <div
      className={`typing-box ${isBlurred ? 'blurred' : ''}`}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onFocus={() => setIsBlurred(false)}
      onBlur={() => setIsBlurred(true)}
      ref={divRef}
    >
      
      <div className="timer">{timeRemaining}</div>
      <div className="content">
        {words.map((word, index) => (
          <span key={index} className={index === currentIndex ? 'current-word' : ''}>
            {renderWord(word, index)}{' '}
          </span>
        ))}
      </div>
      <style jsx>{`
        .typing-box {
          margin: 50px auto;
          max-width: 800px;
          background-color: #f0f0f0;
          border-radius: 10px;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          transition: filter 0.3s;
          overflow: hidden;
          position: relative;
        }
        .timer {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
        }
        .blurred {
          filter: blur(5px);
        }
        .content {
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .correct {
          color: #28a745;
          font-weight: bold;
        }
        .incorrect {
          color: #dc3545;
          font-weight: bold;
        }
        .future {
          color: #666;
        }
        .current-word {
          background-color: #007bff;
          color: white;
          padding: 3px 5px;
          border-radius: 3px;
        }
        span {
          font-family: 'Arial', sans-serif;
          font-size: 20px;
          line-height: 1.5;
          transition: color 0.3s;
        }
        .speed-bar {
          position: relative;
          width: 300px;
          height: 20px;
          background-color: #ddd;
          margin: 20px auto;
          border-radius: 5px;
        }
        .speed-range {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #aaa;
          transform: translateY(-50%);
        }
        .speed-mark {
          position: absolute;
          bottom: -20px;
          transform: translateX(-50%);
          font-size: 12px;
        }
        .car {
          position: absolute;
          top: -30px;
          transform: translateX(-25%);
          font-size: 12px;
        }

      `}</style>


{timeRemaining > 0 &&<SpeedBar speed={carPosition} carType={carType} />}



    </div>
  );
};

export default Typingtest