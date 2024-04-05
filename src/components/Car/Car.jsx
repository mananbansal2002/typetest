// Modified Car Component
import React from "react";

const Car = ({ speed, carType }) => {
  let carIcon;
  switch (carType) {
    case "car":
      carIcon = "🚗"; // Car emoji
      break;
    case "jeep":
      carIcon = "🚙"; // Jeep emoji
      break;
    case "bike":
      carIcon = "🏍"; // Motorcycle emoji
      break;
    default:
      carIcon = "🚗"; // Default to car emoji
  }

  return (
    <div className="car" style={{ left: `${speed}px`, fontSize:"30px" }}>
      {carIcon}
    </div>
  );
};

export default Car;
