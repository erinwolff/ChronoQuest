import { Link } from "react-router-dom";

export const PostsCard = ({ post }) => {
  return (
    <ul className="post-card">
      <section>
        <li className="game">
          <p className="game-text">
            <Link to={`/post/${post.id}`}> {post.title} </Link>
          </p>
        </li>
      </section>
    </ul>
  )
}