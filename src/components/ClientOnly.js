"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "@/auth/context";
import Footer from "@/components/Footer/Footer";
import { Header } from "./Navbar/Header";

const ClientOnly = ({ children }) => {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await sessionStorage.getItem("token");
    if (user) setUser(jwtDecode(user));
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Header />
      <main className="relative ">{children}</main>
      <Footer />
    </AuthContext.Provider>
  );
};

export default ClientOnly;
