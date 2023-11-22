import api from "../../store/api";

const gamesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserGames: builder.query({
      query: () => "/profile",
      providesTags: ["Games"],
    }),
    createGame: builder.mutation({
      query: (gameTitle, gameTime, gameImage, gameReview) => ({
        url: "/profile",
        method: "POST",
        body: gameTitle, gameTime, gameImage, gameReview,
      }),
      invalidatesTags: ["Games", "Home"],
    }),
    deleteGame: builder.mutation({
      query: (id) => ({
        url: `/details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Games", "Home"],
    }),
    getAllGames: builder.query({
      query: () => "/home",
      providesTags: ["Home"],
    }),
  }),
});

export const {
  useGetUserGamesQuery,
  useCreateGameMutation,
  useDeleteGameMutation,
  useGetAllGamesQuery,
} = gamesApi