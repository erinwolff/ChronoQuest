import { useGetAllGamesQuery } from "./gameSlice";
import { Link } from 'react-router-dom'
import { useState } from "react";


export const GameCard = ({ game }) => {
  return (
    <>
      <ul className="game-card">
        <section>
          <li className="game">
            <p className="game-text">
              {game.title}
              <br />
              <br />
              <img className="game-image" src={game.imageUrl} />
              <br />
              {game.time}
              <br />
              <Link to={`/details/${game.id}`}> Review </Link>
            </p>
          </li>
        </section>
      </ul>
    </>
  )
}


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
          <p>Curious about the time commitment for that next game? Search the collection for detailed information, provided by users, for users!</p>
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

