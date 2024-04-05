
import React from "react";
import  Car  from "../Car/Car";
const SpeedBar = ({speed,carType}) => {
    return (
      <div className="speed-bar">
        <Car speed = {speed} carType={carType}></Car>
        <div className="speed-range"></div>
        <div className="speed-mark" style={{ left: `${0}px` }}>0</div>
        <div className="speed-mark" style={{ left: `${300 / 6}px` }}>50</div>
        <div className="speed-mark" style={{ left: `${(300 / 6) * 2}px` }}>100</div>
        <div className="speed-mark" style={{ left: `${(300 / 6) * 3}px` }}>150</div>
        <div className="speed-mark" style={{ left: `${(300 / 6) * 4}px` }}>200</div>
        <div className="speed-mark" style={{ left: `${(300 / 6) * 5}px` }}>250</div>
      </div>
    );
  };

  export default SpeedBar;