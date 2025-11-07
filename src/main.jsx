import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./Layouts/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import AllProducts from "./AllProducts/AllProducts.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Login from "./Pages/Accounts/Login.jsx";
import Register from "./Pages/Accounts/Register.jsx";
import { ToastContainer } from "react-toastify";
import MyProducts from "./Pages/MyProducts.jsx";
import MyBids from "./Pages/MyBids.jsx";
import PrivateProvider from "./Provider/PrivateProvider.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/my-products",
        element: (
          <PrivateProvider>
            <MyProducts />
          </PrivateProvider>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateProvider>
            <MyBids />
          </PrivateProvider>
        ),
      },
      {
        path: "/product-details/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-api-server-mocha.vercel.app/products/${params.id}`
          ),
        element: (
          <PrivateProvider>
            <ProductDetails />
          </PrivateProvider>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-center" />
    </AuthProvider>
  </StrictMode>
);
