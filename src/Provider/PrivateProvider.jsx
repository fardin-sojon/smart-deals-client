import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";

const PrivateProvider = ({children}) => {

  const {user, loading} = useContext(AuthContext);

  const location = useLocation();
  // console.log(location);


  if(loading){
    return <Loading></Loading>
  }

  if(user){ 
    return children;
  }
  return <Navigate state={location?.pathname} to="/login" />
};

export default PrivateProvider;
