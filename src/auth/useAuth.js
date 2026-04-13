"use client";
import { useContext } from "react";
import AuthContext from "./context";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    sessionStorage.setItem("token", JSON.stringify(authToken));
  };

  const logOut = () => {
    console.log("hit");
    setUser(null);
    sessionStorage.removeItem("token");
  };

  return { user, logIn, logOut };
};

export default useAuth;
