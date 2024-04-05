import React from "react";

const Car = ({ speed }) => {
    return (
      <div className="car" style={{ left: `${speed}px` }}>
        🚗
      </div>
    );
  };
  export default Car;
  