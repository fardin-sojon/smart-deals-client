import React from "react";
import { Outlet } from "react-router";
import Navber from "../Components/Navber/Navber";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <div className="min-h-screen container mx-auto px-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
