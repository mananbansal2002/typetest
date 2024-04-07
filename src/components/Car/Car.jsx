import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle, faTruckPickup, faBicycle } from '@fortawesome/free-solid-svg-icons';

const Car = ({ speed, carType, totalTime }) => {
  const [carPositionPercentage, setCarPositionPercentage] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const newPositionPercentage = (speed / 250) * 100; // Calculate new position percentage
      setCarPositionPercentage(newPositionPercentage); // Update car position
    };

    updatePosition(); // Update car position initially

    return () => {
      // Cleanup function
    };
  }, [speed]); // Re-run effect only when speed changes

  let carIcon;
  switch (carType) {
    case "car":
      carIcon = faCar; // Car icon
      break;
    case "bike":
      carIcon = faMotorcycle; // Bike icon
      break;
    case "jeep":
      carIcon = faTruckPickup; // Jeep icon
      break;
    case "cycle":
      carIcon = faBicycle; // Cycle icon
      break;
    default:
      carIcon = faCar; // Default to car icon
  }

  return (
    <div className="car" style={{ left: `${carPositionPercentage}%`, transform: "translateX(-50%)", position: "absolute", top: "-70%", color: "white" }}>
      <FontAwesomeIcon icon={carIcon} />
    </div>
  );
};

export default Car;
