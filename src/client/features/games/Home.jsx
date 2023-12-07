import { useGetAllGamesQuery } from "./gameSlice";
import GameCard from "./GameCard";
import { useState } from "react";

export default function Home() {
  const { data: games, isLoading } = useGetAllGamesQuery();

  const [filteredGame, setFilteredGame] = useState("");
  const filteredGames = games?.filter((g) => (g.title.toLowerCase().includes(filteredGame.toLowerCase()) || g.time.toLowerCase().includes(filteredGame.toLowerCase())));


  return (
    <>
      <div className="search-bar">
        <input type="text" value={filteredGame} onChange={(e) => setFilteredGame(e.target.value)} placeholder="Looking for a game?" />
      </div>

      <div className="games">
        <div className="text-card">
          <h5>Beat the Eternal Quest of Time</h5>
          <p>Curious about the time commitment for your next game? <br/>
          Delve into the collection for detailed insights 
          <br/>
          shared by gamers, for gamers!</p>
        </div>
        {isLoading && <p>Loading games...</p>}
        {filteredGame ? (
          <ul className="search">
            {
              filteredGames?.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            }
          </ul>
        ) : (
          <ul className="gamecard-container">
            {games?.map((game, index) => (
              index >= (games.length - 20) && (
                <GameCard key={game.id} game={game} />
              )))}
          </ul>
        )}
      </div>
    </>
  );
}

