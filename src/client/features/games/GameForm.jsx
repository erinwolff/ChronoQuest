import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"
import { useState } from "react";
import { useCreateGameMutation, useGetAllGamesQuery } from "./gameSlice";


export const GameForm = () => {
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [gameImage, setGameImage] = useState("https://i2.wp.com/www.puntogeek.com/wp-content/uploads/2007/12/space-invaders.jpg");
  const [gameReview, setGameReview] = useState("");
  const [newGame] = useCreateGameMutation();
  const { data: games, isLoading } = useGetAllGamesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newGame({ gameTitle: autocompleteValue, gameTime, gameImage, gameReview });
    setGameTime("");
    setGameImage("https://i2.wp.com/www.puntogeek.com/wp-content/uploads/2007/12/space-invaders.jpg");
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
        <h6>How long did it take to finish the game?</h6>
        <input required
          type="text"
          placeholder="Example: 40 hours"
          value={gameTime}
          onChange={(e) => setGameTime(e.target.value)}
        />
        <h6>Share an image URL below ~<br/>* If you have your own image, delete this link! *</h6>
        <input
          type="text"
          value={gameImage}
          onChange={(e) => setGameImage(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Review"
          value={gameReview}
          onChange={(e) => setGameReview(e.target.value)}
        />
        <button className="small-button-53" role="button">SUBMIT</button>
      </form>
    </>
  )
}