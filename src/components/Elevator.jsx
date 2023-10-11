import { Container } from "react-bootstrap";
import elevatorDefault from "../images/elevatorStandC.png";
import elevatorStand from "../images/elevatorStand1C.png";
import elevatorUp from "../images/elevatorUpC.png";
import elevatorDown from "../images/elevatorDownC.png";
import { useContext, useEffect, useState } from "react";
import style from "../styles/elevator.module.css";
import { ElevatorContext, FloorsToVisitContext } from "../context/index.js";

export const Elevator = () => {
  const { elevatorFloor, setElevatorFloor } = useContext(ElevatorContext);
  const { floorsToVisit, setFloorsToVisit } = useContext(FloorsToVisitContext);
  const [elStyle, setElStyle] = useState(style.elevator);
  const [elImg, setElImg] = useState(elevatorDefault);

  const up = () => {
    return elevatorFloor + 1;
  };
  const down = () => {
    return elevatorFloor - 1;
  };

  const popTheFloor = () => {
    setFloorsToVisit((floorsToVisit) =>
      floorsToVisit.filter((floor) => floor !== elevatorFloor)
    );
  };

  const timer = (callback) => {
    new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(setElevatorFloor(() => callback()));
      }, 3500)
    );
  };

  const elevatorGoDown = async () => {
    await timer(down);
  };

  const elevatorGoUp = async () => {
    await timer(up);
  };

  const changeElevatorVisual = (direction) => {
    switch (direction) {
      case "up":
        setElStyle(style.up);
        setElImg(elevatorUp);
        break;
      case "down":
        setElStyle(style.down);
        setElImg(elevatorDown);
        break;
      case "stay":
        setTimeout(() => {
          setElStyle(style.elevator);
          setElImg(elevatorStand);
        }, 1000);
        break;
      default:
        break;
    }
  };

  const moveElevator = () => {
    if (floorsToVisit[0] > elevatorFloor) {
      changeElevatorVisual("up");
      elevatorGoUp();
    } else if (floorsToVisit[0] < elevatorFloor) {
      changeElevatorVisual("down");
      elevatorGoDown();
    } else return;
  };

  useEffect(() => {
    if (floorsToVisit.length > 0) {
      if (floorsToVisit[0] !== elevatorFloor) moveElevator();
      else if (floorsToVisit.length > 1) {
        changeElevatorVisual("stay");
        setTimeout(() => {
          popTheFloor();
        }, 2000);
      } else popTheFloor();
    } else {
      changeElevatorVisual("stay");
    }
  }, [floorsToVisit]);

  return (
    <Container className="elevator container">
      <img className={elStyle} src={elImg} alt=""></img>
    </Container>
  );
};
