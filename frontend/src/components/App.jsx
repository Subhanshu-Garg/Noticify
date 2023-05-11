import React from "react";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./User/Register";
import Login from "./User/Login";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/register",
    element: <Register />
  }, 
  {
    path: "/login",
    element: <Login />
  }
]);

function App() {
  

  return (
    <div>
        <Header />
        <RouterProvider router={router} />
        <Footer />
    </div>
  );
}

export default App;
