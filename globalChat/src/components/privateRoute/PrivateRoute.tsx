import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const accessToken = localStorage.getItem("access_token");

  return accessToken ? children : <Navigate to={"/"} />;
}

export default PrivateRoute;
