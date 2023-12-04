import { useGetAllPostsQuery, useCreatePostMutation } from "./postsSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

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
              <br />
              <Link to={`/post/${post.id}`}> View </Link>
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

  const [filteredPost, setFilteredPost] = useState("");
  const filteredPosts = posts?.filter((p) => (p.title.toLowerCase().includes(filteredPost.toLowerCase())));


  return (
    <>
      <div className="search-bar">
        <input type="text" value={filteredPost} onChange={(e) => setFilteredPost(e.target.value)} placeholder="Looking for a post?" />
      </div>
      <div>
        <PostForm />
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
          <ul className="post-container">
            {posts?.map((post, index) => (
              index >= (posts.length - 30) && (
                <PostCard key={post.id} post={post} />
              )))}
          </ul>
        )}
      </div>
    </>
  );
}

