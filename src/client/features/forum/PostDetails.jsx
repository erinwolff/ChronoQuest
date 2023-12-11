import { useGetPostByIdQuery, useDeletePostMutation, useDeleteCommentMutation } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom"
import { selectToken } from "../auth/authSlice"
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetPostByIdQuery(id);
  const postTitle = data?.title || "";
  const username = data?.user.username || "";
  const postContent = data?.postContent || "";
  const postComments = data?.comments || [];
  const formattedDate = new Date(data?.createdAt).toLocaleString();

  // Handle delete post function
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [deletePost] = useDeletePostMutation();

  // Handle delete forum post function
  const handleDelete = async () => {
    try {
      if (!token) {
        window.alert("You must be logged in to delete your post!");
      } else {
        const response = await deletePost(data.id);
        if (response.error) {
          window.alert("You do not have permission to delete this post.");
        } else {
          navigate("/forum");
        }
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  // Handle delete comment function
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = async (commentId) => {
    try {
      if (!token) {
        window.alert("You must be logged in to delete your post!");
      } else {
        const response = await deleteComment(commentId);
        if (response.error) {
          window.alert("You do not have permission to delete this comment.");
        } else {
          navigate(`/post/${id}`);
        }
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }
  
  const noTokenPostDetailsContainer = (<>
    <main className="post-details">
      <h3>{postTitle}</h3>
      <br />
      <h4>Posted by: {username}</h4>
      <br />
      <p>{postContent}</p>
      <br />
      {postComments.map((comment) => (
        <div className="comments-container" key={comment.id}>
          <p><b>{comment.user.username} says:</b> {comment.comment}</p>
        </div>
      ))}
    </main>
  </>)

  const tokenPostDetailsContainer = (<>
    <main className="post-details">
      <h3>{postTitle}</h3>
      <br />
      <h4>Posted by: {username} on {formattedDate} </h4>
      <br />
      <p>{postContent}</p>
      <br />
      <h4>Share your thoughts: </h4>
      <br />
      <CommentForm id={id} />
      {postComments.map((comment) => (
        <div className="comments-container" key={comment.id}>
          <p><b>{comment.user.username} says:</b> {comment.comment} <button className="small-button-53 delete-right" role="button" onClick={() => handleDeleteComment(comment.id)}>DELETE</button></p>
        </div>
      ))}
      <button className="small-button-53 delete-post" role="button" onClick={handleDelete}>DELETE POST</button>
    </main>
  </>)

  // checks to see if user is logged in. If not logged in, won't be able to see delete button or comment form.
  if (!token) {
    return isLoading ? (
      <p>Loading...</p>
    ) : (data && (noTokenPostDetailsContainer))
  } else {
    return isLoading ? (
      <p>Loading...</p>
    ) : (data && (tokenPostDetailsContainer))
  }
}


