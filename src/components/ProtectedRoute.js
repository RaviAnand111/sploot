import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../Helper/Auth";

function ProtectedRoute({ children }) {
  const token = getUserToken();
  // return <>{token ? children : <Navigate to="/login" replace={true} />}</>;
  return <div>{token ? children : <div>nah</div>}</div>;
}

export default ProtectedRoute;
