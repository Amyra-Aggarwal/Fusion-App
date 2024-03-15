import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Post from "./Post";
import Login from "./Login";
import ViewPosts from "./ViewPosts";
import Registration from "./Registration";
import Counter from "./Counter";
import Createposts from "./Createposts";
import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <h1>Page not Found</h1>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/Contact",
    element: <Contact></Contact>,
  },
  {
    path: "/posts/:postId",
    element: <Post></Post>,
  },
  {
    path: "/posts",
    element: <ViewPosts></ViewPosts>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/counter",
    element: <Counter></Counter>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/Createposts",
    element:<Createposts></Createposts>,
  },
  {
    path: "/myposts",
    element:<Profile></Profile>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
