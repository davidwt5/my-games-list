import {useEffect, useState} from "react";
import GamesList from "../Utility/GamesList";

function MyGames() {
  // List if gameIDs
  const [gamesList, setGamesList] = useState(undefined);

  // Obtains the games list for the user belonging to that sessionID (assumes logged in)
  useEffect(() => {
    (async () => {
      const url = "http://localhost:4000/gameslist";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include" // Security risk? Need this so the browser sends cookies.
      });
      const result = await response.json();
      setGamesList(result);
    })();
  }, []);

  // Sync the changes to the database whenever gamesList gets updated
  useEffect(() => {

  }, [gamesList]);

  return (
    // Return ERROR: UNAUTHORISED PAGE if no session ID
    <div className="my-games">
      <GamesList list={gamesList} />
    </div>
  );
}

export default MyGames;
