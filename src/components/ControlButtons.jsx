import { Button, Container, Row, Col, Alert } from "react-bootstrap";

import { useContext, useEffect } from "react";

import { ElevatorContext, FloorsToVisitContext } from "../context/index.js";

export const ControlButtons = () => {
  const { elevatorFloor } = useContext(ElevatorContext);
  const { floorsToVisit, setFloorsToVisit } = useContext(FloorsToVisitContext);

  function checkVariant(floor) {
    return floorsToVisit.includes(floor) ? "info" : "primary";
  }

  const checkVariant1 = checkVariant(1);
  const checkVariant2 = checkVariant(2);
  const checkVariant3 = checkVariant(3);
  const checkVariant4 = checkVariant(4);
  const checkVariant5 = checkVariant(5);
  const checkVariant6 = checkVariant(6);
  const checkVariant7 = checkVariant(7);
  const checkVariant8 = checkVariant(8);
  const checkVariant9 = checkVariant(9);

  const onFloorButtonClicked = (f) => {
    if (!floorsToVisit.includes(f)) {
      if (floorsToVisit.length === 0) setFloorsToVisit([f]);
      else {
        const doesGap = floorsToVisit.find((a, b) => b < a < f || b > a > f);
        console.log(doesGap);

        if (
          floorsToVisit.every((floor) => floor > f) ||
          floorsToVisit.every((floor) => floor < f)
        )
          setFloorsToVisit((floorsToVisit) => [...floorsToVisit, f]);
        else if (floorsToVisit.find((a, b) => a > f > b))
          setFloorsToVisit((floorsToVisit) =>
            floorsToVisit
              .filter((floor) => floor > f)
              .concat(f, ...floorsToVisit.filter((floor) => floor < f))
          );
        else if (floorsToVisit.find((a, b) => a < f < b))
          setFloorsToVisit((floorsToVisit) =>
            floorsToVisit
              .filter((floor) => floor < f)
              .concat(f, ...floorsToVisit.filter((floor) => floor > f))
          );
      }
    }
  };

  useEffect(() => {
    console.log(floorsToVisit);
  }, [floorsToVisit]);

  return (
    <Container className="buttons container">
      <Row className="mb-4">
        <Alert variant="success">
          <Alert.Heading>
            Elevator is on the {elevatorFloor}'th floor
          </Alert.Heading>
        </Alert>
      </Row>
      <Row className="buttons row">
        <Col className="buttons col">
          <Button
            variant={checkVariant7}
            onClick={() => onFloorButtonClicked(7)}
          >
            7
          </Button>
          <Button
            className="mx-2 my-1"
            variant={checkVariant8}
            onClick={() => onFloorButtonClicked(8)}
          >
            8
          </Button>
          <Button
            variant={checkVariant9}
            onClick={() => onFloorButtonClicked(9)}
          >
            9
          </Button>
        </Col>
      </Row>
      <Row className="buttons row">
        <Col className="buttons col">
          <Button
            variant={checkVariant4}
            onClick={() => onFloorButtonClicked(4)}
          >
            4
          </Button>
          <Button
            className="mx-2 my-1"
            variant={checkVariant5}
            onClick={() => onFloorButtonClicked(5)}
          >
            5
          </Button>
          <Button
            variant={checkVariant6}
            onClick={() => onFloorButtonClicked(6)}
          >
            6
          </Button>
        </Col>
      </Row>
      <Row className="buttons row">
        <Col className="buttons col">
          <Button
            variant={checkVariant1}
            onClick={() => onFloorButtonClicked(1)}
          >
            1
          </Button>
          <Button
            variant={checkVariant2}
            className="mx-2 my-1"
            onClick={() => onFloorButtonClicked(2)}
          >
            2
          </Button>
          <Button
            variant={checkVariant3}
            onClick={() => onFloorButtonClicked(3)}
          >
            3
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
