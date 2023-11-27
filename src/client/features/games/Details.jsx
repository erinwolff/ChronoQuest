import { useGetGameByIdQuery, useDeleteGameMutation } from "./gameSlice";
import { useParams, useNavigate } from "react-router-dom"


export default function Details() {
  const { id } = useParams();
  const { data, isLoading } = useGetGameByIdQuery(id);
  const game = data?.game || {};
  const username = data?.username || "";
  const playtime = data?.game.time || "";
  const review = data?.game.review || "";

  // Handle delete function
  const navigate = useNavigate();
  const [deleteGame] = useDeleteGameMutation();
  const handleDelete = () => {
    deleteGame(game.id);
    navigate("/profile");
  }
 
  return isLoading ? (
    <p>Loading...</p>
  ) : (game && (
    <>
      <main className="game-details">
        <h3>{game.title}</h3>
        <h4>Posted by: {username}</h4>
        <br />
        <img src={game.imageUrl} />
        <br />
        <h4>{username}'s Playtime:</h4>
        <br />
        {playtime}
        <br />
        <br/>
        <h4>{username}'s Review:</h4>
        <br />
        {review}
      </main>
      <button className="deleteButton" onClick={handleDelete}>DELETE</button>
    </>
  ))


}

