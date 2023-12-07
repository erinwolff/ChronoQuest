import { useState } from "react";
import {useCreateCommentMutation} from "./postsSlice";

export default function CommentForm ({ id }) {
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