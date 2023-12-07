import { useGetUserGamesQuery } from "./gameSlice";
import { useGetUserPostsQuery } from "../forum/postsSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice"
import { PostsCard } from "./PostsCard";
import { useState } from "react";
import GameCard from "./GameCard";
import { GameForm } from "./GameForm";
import { Link } from "react-router-dom";

export default function Profile() {
  const token = useSelector(selectToken);
  const { data, isLoading } = useGetUserGamesQuery();
  const { data: posts } = useGetUserPostsQuery();

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
        {isLoading && <p>Loading games...</p>}
        {filteredGame ? (
          <div className="profile">
            <div className="text-card">
              <h1 className="profile-header">Welcome home, {username} 🎮</h1>
              <br />
              <h4>Finished a game?</h4>
              <br />
              <h4>Search for the game title. Don't see it? Add a new one.</h4>
              <br />
              <GameForm />
              <h4>{username}'s Forum Posts</h4>
              {posts?.posts.map((post) => (
                <PostsCard key={post.id} post={post} />
              ))}
            </div>
            <ul className="search">{
              filteredGames?.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            }
            </ul>
            <br />
            <br />
          </div>
        ) : (
          <div className="profile">
            <div className="text-card">
              <h1 className="profile-header">Welcome home, {username} 🎮</h1>
              <br />
              <h4>Finished a game?</h4>
              <br />
              <h6>Search for the game title. Don't see it? Add a new one.</h6>
              <br />
              <GameForm />
              <h4>{username}'s Forum Posts</h4>
              {posts && posts.posts && posts.posts.length > 0 ? (
                posts.posts.map((post) => <PostsCard key={post.id} post={post} />)
              ) : (
                <p>You haven't posted yet. Write one <Link to={'/forum'}> here</Link>!</p>
              )}
            </div>
            <ul className="gamecard-container">
              {games?.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ul>
            <br />
            <br />
          </div>
        )}
      </>
    );
  }
}

