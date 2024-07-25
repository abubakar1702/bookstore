import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Books from "./pages/Books"
import Stationeries from "./pages/Stationeries"
import Blog from "./pages/Blog"
import AboutUs from "./pages/AboutUs"
import Footer from "./components/Footer"
import Admin from "./pages/Admin"
import SingleBook from "./pages/SingleBook"
import Order from "./pages/Order"
import AuthorProfile from "./pages/AuthorProfile"

const Layout = () => {
  return <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:
      [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/books",
          element: <Books />
        },
        {
          path: "/stationeries",
          element: <Stationeries />
        },
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/blog",
          element: <Blog />
        },
        {
          path: "/aboutus",
          element: <AboutUs />
        },
        {
          path: "/admin",
          element: <Admin />
        },
        {
          path: "/singlebook/:id",
          element: <SingleBook />
        },
        {
          path: "/order",
          element: <Order />
        },
        {
          path: "/author/:id",
          element: <AuthorProfile />
        }

      ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
