import { useGetGameByIdQuery, useDeleteGameMutation } from "./gameSlice";
import { useParams, useNavigate } from "react-router-dom"
import { selectToken } from "../auth/authSlice"
import { useSelector } from "react-redux";


export default function Details() {
  const { id } = useParams();
  const { data, isLoading } = useGetGameByIdQuery(id);
  const game = data?.game || {};
  const username = data?.username || "";
  const playtime = data?.game.time || "";
  const review = data?.game.review || "";

  // Handle delete function
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [deleteGame] = useDeleteGameMutation();
  const handleDelete = async () => {
    try {
      if (!token) {
        window.alert("You must be logged in to delete your game post!");
      } else {
        const response = await deleteGame(game.id);
        if (response.error) {
          window.alert("You do not have permission to delete this game.");
        } else {
          navigate("/profile");
        }
      }
    } catch (err) {
      console.error("Error deleting game:", err);
    }
  }

  // checks to see if user is logged in. If not logged in, won't be able to see delete button.
  if (!token) {
    return isLoading ? (
      <p>Loading...</p>
    ) : (game && (
      <>
        <main className="game-details">
          <h3>{game.title}</h3>
          <h4>Posted by: {username}</h4>
          <br />
          <img className="details-game-image" alt="image of game provided by user" src={game.imageUrl} />
          <br />
          <h4>{username}'s Playtime:</h4>
          <br />
          {playtime}
          <br />
          <br />
          <h4>{username}'s Review:</h4>
          <br />
          {review}
          <br />
          <br />
        </main>
      </>
    ))
  } else {
    return isLoading ? (
      <p>Loading...</p>
    ) : (game && (
      <>
        <main className="game-details">
          <h3>{game.title}</h3>
          <h4>Posted by: {username}</h4>
          <br />
          <img className="details-game-image" src={game.imageUrl} />
          <br />
          <h4>{username}'s Playtime:</h4>
          <br />
          {playtime}
          <br />
          <br />
          <h4>{username}'s Review:</h4>
          <br />
          {review}
          <br />
          <br />
          <button className="small-button-53 delete-right" role="button" onClick={handleDelete}>DELETE</button>
        </main>
      </>
    ))
  }
}

