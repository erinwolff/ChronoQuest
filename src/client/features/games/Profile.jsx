import { useGetUserGamesQuery, useCreateGameMutation, useGetAllGamesQuery } from "./gameSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice"
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"


export const GamesCard = ({ game }) => {
  return (
    <ul className="game-card">
      <section>
        <li className="game">
          <p className="game-text">
            {game.title}
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
  )
}

export const GameForm = () => {
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [gameReview, setGameReview] = useState("");
  const [newGame] = useCreateGameMutation();
  const { data: games, isLoading } = useGetAllGamesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newGame({ gameTitle: autocompleteValue, gameTime, gameImage, gameReview });
    setGameTime("");
    setGameImage("");
    setGameReview("");
    setAutocompleteValue("");
  };

  return (
    <>
      <form className="add-game-form" onSubmit={handleSubmit}>
        {isLoading ? (
          <p>Loading games...</p>
        ) : (
          <Autocomplete
            freeSolo
            options={[...new Set(games?.map((option) => option.title))]}
            value={autocompleteValue}
            onInputChange={(event, newInputValue) => setAutocompleteValue(newInputValue)}
            className="autocomplete"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Game Title"
                required
              />
            )}
          />
        )}
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
        <textarea
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
  const [filteredGame, setFilteredGame] = useState("");
  const filteredGames = games?.filter((g) => (g.title.toLowerCase().includes(filteredGame.toLowerCase()) || g.time.toLowerCase().includes(filteredGame.toLowerCase())));


  if (!token) {
    return <p>You must be logged in to view your profile.</p>
  } else {
    return (
      <>
        <div className="search-bar">
          <input type="text" value={filteredGame} onChange={(e) => setFilteredGame(e.target.value)} placeholder="Search your games" />
        </div>
        <h1 className="profile-header"> 🎮 Welcome home, {username} 🎮</h1>
        <br />
        {isLoading && <p>Loading games...</p>}
        {filteredGame ? (
          <div className="profile">
            <ul className="search">{
              filteredGames?.map((game) => (
                <GamesCard key={game.id} game={game} />
              ))
            }
            </ul>
            <br />
            <br />
            <div className="text-card">
              <h4>Finished a game?</h4>
              <br />
              <h4>Search for the game title. Don't see it? Add a new one.</h4>
            </div>
            <GameForm />
          </div>
        ) : (
          <div className="profile">
            <ul className="gamecard-container">
              {games?.map((game) => (
                <GamesCard key={game.id} game={game} />
              ))}
            </ul>
            <br />
            <br />
            <div className="text-card">
              <h4>Finished a game?</h4>
              <br />
              <h6>Search for the game title. Don't see it? Add a new one.</h6>
            </div>
            <GameForm />
          </div>
        )}
      </>
    );
  }
}

