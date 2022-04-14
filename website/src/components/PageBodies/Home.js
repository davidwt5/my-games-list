import Container from "react-bootstrap/Container";

function Home() {
  return (
    <Container className="d-flex flex-column p-5">
      <h1 className="display-4" style={{ width: "100%" }}>
        Welcome! <hr />
      </h1>
      <body className="lead">
        <p>
          This is my first <b>full stack</b> personal project where I try to create an
          app for users to manage their video game backlog. The idea for this
          project was inspired by{" "}
          <a href="https://myanimelist.net/">MyAnimeList</a>. The purpose of
          this project are as follows:
        </p>
        <ol>
          <li>
            Put into practice the web technologies I've learnt but never used in
            a real project (i.e. React, Bootstrap, etc.)
          </li>
          <li>
            Learn to implement common web functionality (i.e. Authentication,
            Session, etc.)
          </li>
          <li>
            Learn to build <em>reasonably</em> good looking UI
          </li>
          <li>Understand how all the parts of web development fit together</li>
        </ol>
        <p>
          Here is the{" "}
          <a href="https://github.com/davidwt5/my-games-list">
            github repository
          </a>
          {" "}with more details.
        </p>
      </body>
    </Container>
  );
}

export default Home;
