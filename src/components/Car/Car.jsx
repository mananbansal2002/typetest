import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle, faTruckPickup, faBicycle } from '@fortawesome/free-solid-svg-icons';

const Car = ({ speed, carType }) => {
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
    <div className="car" style={{ left: `${speed}px`, fontSize: "30px" }}>
      <FontAwesomeIcon icon={carIcon} />
    </div>
  );
};

export default Car;
