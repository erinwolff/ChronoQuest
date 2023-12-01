import api from "../../store/api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/forum",
      providesTags: ["Forum"],
    }),
    createPost: builder.mutation({
      query: (postTitle, postDetails) => ({
        url: "/forum",
        method: "POST",
        body: postTitle, postDetails,
      }),
      invalidatesTags: ["Forum"],
    }),
    createComment: builder.mutation({
      query: (postComment) => ({
        url: `/post/${id}`,
        method: "POST",
        body: postComment,
      }),
      invalidatesTags: ["Forum"],
    }),
    getPostById: builder.query({
      query: (id) => `/post/${id}`,
      method: "GET",
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forum"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/comment`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forum"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useCreateCommentMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
} = postsApi
