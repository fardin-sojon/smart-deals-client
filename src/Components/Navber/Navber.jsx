import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { toast } from "react-toastify";

const Navber = () => {
  const { user , signOutUser} = useContext(AuthContext);
  // console.log(user);

  const haldleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Account LogOut🙂");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/my-products">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/my-bids">My Bids</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="bg-base-100 shadow-sm">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <a className="text-xl font-bold">
              Smart<span className="text-primary-gradient">Deals</span>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex gap-2">
                <Link>
                  <img
                    className="rounded-full h-10 w-10 border-3 border-blue-400"
                    src={user&& user? user?.photoURL : "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg"}
                    alt=""
                  />
                </Link>
                <Link onClick={haldleSignOut} className="btn btn-primary">
                  LogOut
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link className="btn border-2 border-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
