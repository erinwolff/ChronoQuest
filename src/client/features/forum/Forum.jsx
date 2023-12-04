import { useGetAllPostsQuery, useCreatePostMutation } from "./postsSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <>
      <div className="post-text">
        
          <h3>{post.title}</h3>
          <br />
          <h4>Date posted: {formattedDate}</h4>
          <br />
          <p>{post.postContent}</p>
          <br />
          <Link className="view-link" to={`/post/${post.id}`}> View </Link>
        
      </div>
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
      <h3>What's on your mind?</h3>
        <input required
          type="text"
          placeholder="Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Content"
          value={postDetails}
          onChange={(e) => setPostDetails(e.target.value)}
        />
        <button className="small-button-53" role="button">Submit</button>
      </form>
    </>
  )
}

export default function Forum() {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  const [filteredPost, setFilteredPost] = useState("");
  const filteredPosts = posts?.filter((p) => (p.title.toLowerCase().includes(filteredPost.toLowerCase())));


  return (
    <>
      <div className="search-bar">
        <input type="text" value={filteredPost} onChange={(e) => setFilteredPost(e.target.value)} placeholder="Looking for a post?" />
      </div>
      <div>
        
        {isLoading && <p>Loading posts...</p>}
        {filteredPost ? (
          <ul className="search">
            {
              filteredPosts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            }
          </ul>
        ) : (
          <div className="forum-container">
            <PostForm />
            {posts?.map((post, index) => (
              index >= (posts.length - 30) && (
                <PostCard key={post.id} post={post} />
              )))}
          </div>
        )}
      </div>
    </>
  );
}

