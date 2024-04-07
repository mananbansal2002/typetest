import React from "react";
 const Result = ({ wpm, onRestart, themeColor }) => {
  console.log(themeColor);
    return (
      <div className={`result-container ${themeColor}-secondary`}>
        <h2>Typing Test Result</h2>
        <p>Your Words Per Minute (WPM): <span className="wpm">{wpm}</span></p>
        <button className="restart-btn" onClick={onRestart}>Restart</button>
        <style jsx>{`
          .result-container {
            margin: 50px auto;
            max-width: 400px;
            // background-color: rgb(45, 45, 45);
            border-radius: 10px;
            color:white;
            padding: 20px;
            text-align: center;
          }
          h2 {
            color: #007bff;
            margin-bottom: 20px;
          }
          .wpm {
            font-size: 24px;
            font-weight: bold;
          }
          .restart-btn {
            padding: 8px 16px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 20px;
          }
          .restart-btn:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
  };
  
  export default Result;
  