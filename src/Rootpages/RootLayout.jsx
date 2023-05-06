import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container>
      <Header />
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
