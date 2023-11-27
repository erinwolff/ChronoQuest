import { useGetAllGamesQuery } from "./gameSlice";
import {Link} from 'react-router-dom'


export const GameCard = ({ game }) => {
  return (
    <>
      <ul className="game-card">
        <section>
          <li className="game">
            <p className="game-text">
              {game.title}
              <br/>
              <img src={game.imageUrl}/>
              <br/>
              {game.time}
              <br/>
              <Link to={`/details`}> Review </Link>
            </p>
          </li>
        </section>
      </ul>
    </>
  )
}


export default function Home() {
  const { data: games, isLoading } = useGetAllGamesQuery();

  return (
    <div className="games">
      <p>See what the world is playing:</p>
      {isLoading && <p>Loading games...</p>}
      {games && (
        <ul>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
}

