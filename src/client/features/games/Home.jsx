import { useGetAllGamesQuery } from "./gameSlice";


export const HomeCard = ({ game }) => {
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
      <h1>See what the world is playing:</h1>
      {isLoading && <p>Loading games...</p>}
      {games && (
        <ul>
          {games.map((game) => (
            <HomeCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
}

