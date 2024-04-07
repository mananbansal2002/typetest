import React, { useEffect, useRef, useState } from "react";
import Car from "../Car/Car";
import "./Speedbar.css"; // Import CSS file for SpeedBar styling

const SpeedBar = ({ speed, carType }) => {
  const speedBarRef = useRef(null);


  return (
    <div className="speed-bar-container">
      <Car speed={speed} carType={carType}></Car>
      <div className="straight-line"></div> {/* White line */}
      <div className="speed-bar" ref={speedBarRef}>  
        <div className="speed-mark mark-1">0</div>
        <div className="speed-mark mark-2">50</div>
        <div className="speed-mark mark-3">100</div>
        <div className="speed-mark mark-4">150</div>
        <div className="speed-mark mark-5">200</div>
        <div className="speed-mark mark-5">250</div>
      </div>
    </div>
  );
};

export default SpeedBar;
