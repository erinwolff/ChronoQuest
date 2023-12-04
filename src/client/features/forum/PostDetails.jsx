import { useGetPostByIdQuery, useCreateCommentMutation, useDeletePostMutation, useDeleteCommentMutation } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom"
import { selectToken } from "../auth/authSlice"
import { useSelector } from "react-redux";
import { useState } from "react";

export const CommentForm = ({ id }) => {
  const [postComment, setPostComment] = useState("");
  const [newComment] = useCreateCommentMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await newComment({ id, postComment });
    setPostComment("");
  };

  return (
    <>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <textarea required
          type="text"
          placeholder="Comment"
          value={postComment}
          onChange={(e) => setPostComment(e.target.value)}
        />
        <button className="small-button-53" role="button">SUBMIT</button>
      </form>
    </>
  )
}

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetPostByIdQuery(id);
  const postTitle = data?.title || "";
  const username = data?.user.username || "";
  const postContent = data?.postContent || "";
  const postComments = data?.comments || "";

  // Handle delete post function
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [deletePost] = useDeletePostMutation();
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

  // checks to see if user is logged in. If not logged in, won't be able to see delete button or comment form.
  if (!token) {
    return isLoading ? (
      <p>Loading...</p>
    ) : (data && (
      <>
        <main className="post-details">
          <h3>{postTitle}</h3>
          <h4>Posted by: {username}</h4>
          <br />
          <h4>{postContent}</h4>
          <br />
          <h4>Comments: </h4>
          {postComments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.user.username} says: {comment.comment}</p>
            </div>
          ))}
        </main>
      </>
    ))
  } else {
    return isLoading ? (
      <p>Loading...</p>
    ) : (data && (
      <>
        <main className="post-details">
          <h3>{postTitle}</h3>
          <h4>Posted by: {username}</h4>
          <br />
          <h4>{postContent}</h4>
          <br />
          <h4>Share your thoughts: </h4>
          <br />
          <CommentForm id={id} />
          {postComments.map((comment) => (
            <div className="comments-container" key={comment.id}>
              <p><b>{comment.user.username} says:</b> {comment.comment} <button className="small-button-53 delete-comment" role="button" onClick={() => handleDeleteComment(comment.id)}>DELETE</button></p>
            </div>
          ))}
          <button className="small-button-53 delete-post" role="button" onClick={handleDelete}>DELETE POST</button>
        </main>
      </>
    ))
  }
}


