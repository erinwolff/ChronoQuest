import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"
import { useState } from "react";
import {useCreateGameMutation, useGetAllGamesQuery } from "./gameSlice";

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
        <button className="small-button-53" role="button">SUBMIT</button>
      </form>
    </>
  )
}