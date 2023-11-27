import { useGetUserGamesQuery, useCreateGameMutation } from "./gameSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice"
import { Link } from "react-router-dom";
import { useState } from "react";

export const GamesCard = ({ game }) => {
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

export const GameForm = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [gameReview, setGameReview] = useState("");
  const [newGame] = useCreateGameMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newGame({ gameTitle, gameTime, gameImage, gameReview });
    setGameTitle("");
    setGameTime("");
    setGameImage("");
    setGameReview("");
  };

  return (
    <>
      <form className="add-game-form" onSubmit={handleSubmit}>
        <input required
          type="text"
          placeholder="Title"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />
        <input required
          type="text"
          placeholder="Time to beat"
          value={gameTime}
          onChange={(e) => setGameTime(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Image URL"
          value={gameImage}
          onChange={(e) => setGameImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Review"
          value={gameReview}
          onChange={(e) => setGameReview(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  )
}



export default function Profile() {
  const token = useSelector(selectToken);
  const { data, isLoading } = useGetUserGamesQuery();
  const games = data?.games || [];
  const username = data?.username || "";

  if (!token) {
    return <p>You must be logged in to view your profile.</p>
  }

  return (
    <>
      <h1>{username}'s Games</h1>
      <br />
      {games && (
        <ul>
          {games?.map((game) => (
            <GamesCard key={game.id} game={game} />
          ))}
        </ul>
      )}
      <br />
      <br />
      <h4>Finished a game?</h4>
      <br />
      <h4>Add it to the list.</h4>
      <GameForm />
    </>
  );
}

