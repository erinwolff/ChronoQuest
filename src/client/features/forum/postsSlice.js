import api from "../../store/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/forum",
      providesTags: ["Forum"],
    }),
    getUserPosts: builder.query({
      query: () => "/profile/forum",
      providesTags: ["Profile"],
    }),
    createPost: builder.mutation({
      query: (postTitle, postDetails) => ({
        url: "/forum",
        method: "POST",
        body: postTitle, postDetails,
      }),
      invalidatesTags: ["Forum", "Profile"],
    }),
    createComment: builder.mutation({
      query: ({ id, postComment }) => ({
        url: `/post/${id}`,
        method: "POST",
        body: { id, postComment },
      }),
      invalidatesTags: ["Forum", "Post"],
    }),
    getPostById: builder.query({
      query: (id) => `/post/${id}`,
      method: "GET",
      providesTags: ["Post"]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forum", "Profile"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/comment`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forum", "Post"],
    }),
  })
});


export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useCreateCommentMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
  useGetUserPostsQuery
} = postsApi
