import { useGetAllPostsQuery } from "./postsSlice";
import { useState } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import PostForm from "./PostForm";

export default function Forum() {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  const [filteredPost, setFilteredPost] = useState("");
  const filteredPosts = posts?.filter((p) => (p.title.toLowerCase().includes(filteredPost.toLowerCase()) || p.postContent.toLowerCase().includes(filteredPost.toLowerCase())));
  const token = useSelector(selectToken);

  const filteredForumPost = (<ul className="search">
    {
      filteredPosts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))
    }
  </ul>)

  const forumContainer = (<div className="forum-container">
    <h2>Recent Community Posts</h2>
    <br />
    {posts?.map((post, index) => (
      index >= (posts.length - 15) && (
        <PostCard key={post.id} post={post} />
      )))}
  </div >)

  const forumContainerWithForm = (<div className="forum-container">
    <h2>Recent Community Posts</h2>
    <br />
    <PostForm />
    {posts?.map((post, index) => (
      index >= (posts.length - 20) && (
        <PostCard key={post.id} post={post} />
      )))}
  </div>)

  const noTokenForumView = (posts && (
    <>
      <div className="search-bar">
        <input type="text" value={filteredPost} onChange={(e) => setFilteredPost(e.target.value)} placeholder="Search Posts" />
      </div>
      <div>
        {isLoading && <p>Loading posts...</p>}
        {filteredPost ? (filteredForumPost) : (forumContainer)}
      </div >
    </>
  ))

  const tokenForumView = (posts && (
    <>
      <div className="search-bar">
        <input type="text" value={filteredPost} onChange={(e) => setFilteredPost(e.target.value)} placeholder="Search Posts" />
      </div>
      <div>
        {isLoading && <p>Loading posts...</p>}
        {filteredPost ? (filteredForumPost) : (forumContainerWithForm)}
      </div>
    </>
  ))

  // Checks if user is logged in. If not logged in, component displays forum WITHOUT post submission form. If logged in, component displays forum WITH submission form.
  if (!token) {
    return isLoading ? (
      <p>Loading...</p>
    ) : (noTokenForumView)
  } else {
    return isLoading ? (
      <p>Loading...</p>
    ) : (tokenForumView);
  }
}

