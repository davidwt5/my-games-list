import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert"

function UnderConstruction() {
  return (
    <Container className="my-4 px-5 w-75">
      <Alert variant="warning">This page is currently under construction</Alert>
    </Container>
  );
}

export default UnderConstruction;
