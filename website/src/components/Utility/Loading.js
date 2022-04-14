// Generic loading animation
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

function Loading() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center p-5 m-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h5 className="my-3">Loading</h5>
    </Container>
  );
}

export default Loading;
