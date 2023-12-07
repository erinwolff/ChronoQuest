import { useState } from "react";
import {useCreatePostMutation} from "./postsSlice";

export default function PostForm() {
  const [postTitle, setPostTitle] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [newPost] = useCreatePostMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await newPost({ postTitle, postDetails });
    setPostTitle("");
    setPostDetails("");
  };

  return (
    <>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <h3>What's on your mind?</h3>
        <input required
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea required
          type="text"
          placeholder="Content"
          value={postDetails}
          onChange={(e) => setPostDetails(e.target.value)}
        />
        <button className="small-button-53" role="button">SUBMIT</button>
      </form>
    </>
  )
}
