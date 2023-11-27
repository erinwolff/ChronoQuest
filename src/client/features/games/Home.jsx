import { useGetAllGamesQuery } from "./gameSlice";
import { Link } from 'react-router-dom'


export const GameCard = ({ game }) => {
  return (
    <>
      <ul className="game-card">
        <section>
          <li className="game">
            <p className="game-text">
              {game.title}
              <br />
              <img src={game.imageUrl} />
              <br />
              {game.time}
              <br />
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
      <h5>Join the party!</h5>
      <h6>Create a profile to track your games & write reviews.</h6>
      <br />
      <h5>Beat the eternal quest of time!</h5>
      <h6>Wondering about the time commitment for that next game? Search the collection for detailed information, provided by users, for users! </h6>
      <br />
      <h5>See what the world is playing:</h5>
      <br />
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

