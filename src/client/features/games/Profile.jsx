import { useGetUserGamesQuery } from "./gameSlice";
import {useSelector} from "react-redux";
import {selectToken} from "../auth/authSlice"
import { Link } from 'react-router-dom'

export const GamesCard = ({game}) => {
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
            <Link to={`/details/${game.id}`}> Review </Link>
          </p>
        </li>
      </section>
    </ul>
  </>
  )
}



export default function Profile() {
  const token = useSelector(selectToken);
  const {data, isLoading} = useGetUserGamesQuery();
  const games = data?.games || [];
  const username = data?.username || "";

  if(!token){
    return <p>You must be logged in to view your profile.</p>
  }

  return (
    <>
      <h1>{username}'s Games</h1>
      <br />
      {games && (
        <ul>
          {games?.map((game) => (
            <GamesCard key = {game.id} game={game}/>
          ))}
        </ul>
      )}
    </>
  );
}

