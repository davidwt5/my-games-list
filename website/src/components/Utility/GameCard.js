import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import "./GameCard.css";
import GamelistControls from "./GamelistControls";

function GameCard({ game }) {
  const { id, name, image, deck, original_release_date } = game;
  return (
    <Card className="my-4 text-center" style={{ width: "100%" }}>
      <Card.Header as="h5">{name}</Card.Header>
      <Image
        src={image.original_url}
        className="w-75 my-4 m-auto"
        style={{ aspectRatio: "4/5" }}
      ></Image>
      <Card.Body>
        <Card.Text className="text-truncate">{deck}</Card.Text>
        <Card.Text>{original_release_date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <GamelistControls id={id} />
      </Card.Footer>
    </Card>
  );
}

export default GameCard;
