import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Building } from './components/Building';
import { ControlButtons } from './components/ControlButtons';
import {  useState } from "react";
import { ElevatorContext, FloorsToVisitContext } from './context/index.js';

function App() {
  const [floorsToVisit, setFloorsToVisit] = useState([]);
  const [elevatorFloor, setElevatorFloor] = useState(5);

  return (
    <div className="App App-header">
    <FloorsToVisitContext.Provider value={{floorsToVisit, setFloorsToVisit}}>
    <ElevatorContext.Provider value={{elevatorFloor, setElevatorFloor}}>
      <Container fluid>
        <Row className="my-3">
          <Col sm={9}>
            <Building/>
          </Col>
          <Col sm={3} className="my-auto">
            <ControlButtons/>
          </Col>
        </Row>
      </Container>
    </ElevatorContext.Provider>
    </FloorsToVisitContext.Provider>
    </div>
  );
}

export default App;
