import { useGetAllPostsQuery, useCreatePostMutation } from "./postsSlice";
import { useState } from "react";

export const PostCard = ({ post }) => {
  return (
    <>
      <ul className="post-card">
        <section>
          <li className="post">
            <p className="post-text">
              {post.title}
              <br />
              Posted on: {post.createdAt}
              <br />
              {post.postContent}
            </p>
          </li>
        </section>
      </ul>
    </>
  )
}

export const PostForm = () => {
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
        <input required
          type="text"
          placeholder="Post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          value={postDetails}
          onChange={(e) => setPostDetails(e.target.value)}
        />
        <button className="button-53" role="button">Submit</button>
      </form>
    </>
  )
}

export default function Forum() {
  const { data: posts, isLoading } = useGetAllPostsQuery();
  
  return (
    <div>
      <PostForm />
      {isLoading && <p>Loading posts...</p>}
      <ul className="post-container">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

