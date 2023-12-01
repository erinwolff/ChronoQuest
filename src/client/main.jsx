import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/Root.jsx";

import Home from "./features/games/Home.jsx";
import Profile from "./features/games/Profile.jsx";
import Details from "./features/games/Details.jsx";
import Forum from "./features/forum/Forum.jsx";
import PostDetails from "./features/forum/PostDetails.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/details/:id", element: <Details /> },
      { path: "/login", element: <AuthForm /> },
      { path: "/forum", element: <Forum /> },
      { path: "/post/:id", element: <PostDetails /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
