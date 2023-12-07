import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <>
      <div className="post-text">

        <h3>{post.title}</h3>
        <br />
        <h4>Date posted: {formattedDate}</h4>
        <Link className="view-link" to={`/post/${post.id}`}> View </Link>
        <br />
        <p>{post.postContent}</p>
        <br />
      </div>
    </>
  )
}