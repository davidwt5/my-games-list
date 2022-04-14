import Container from "react-bootstrap/Container";

function Home() {
  return (
    <Container className="d-flex flex-column p-5">
      <h1 className="display-4" style={{width: "100%"}}>
        Welcome! <hr />
      </h1>
      <h3 className="lead">
        This is my first full stack personal project where...
      </h3>
    </Container>
  );
}

export default Home;
