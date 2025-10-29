// src/context/AuthContext.jsx
import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { div } from "framer-motion/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check login status once when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("token");

        const res = await axios.post(
          "https://fabribuzz.onrender.com/api/user/admin/check-auth",
          { token }
        );
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  //  Login
  const login = async (email, password) => {
    const signuInData = {
      email,
      password,
    };

    //DATA SEND TO BACKEND
    const res = await axios.post(
      "https://fabribuzz.onrender.com/api/user/admin/signin",
      signuInData
    );

    //  console.log("login done", res);
    Cookies.set("token", res.data.token);

    // console.log(user);
    const token = Cookies.get("token");
    const res2 = await axios.post(
      "https://fabribuzz.onrender.com/api/user/admin/check-auth",
      { token }
    );
    // console.log("res 2 ", res2.data.user);

    setUser(res2.data.user);
    navigate("/");
  };

  // 🔹 Signup
  const signup = async (data) => {
    //DATA SEND TO BACKEND
    // console.log(data);

    const res = await axios.post(
      "https://fabribuzz.onrender.com/api/user/signup",
      data
    );
    // console.log(res);
    Cookies.set("token", res.data.tokenLast);

    // console.log(user);
    const token = Cookies.get("token");
    const res2 = await axios.post(
      "https://fabribuzz.onrender.com/api/user/check-auth",
      { token }
    );
    console.log("res 2 ", res2.data.user);
    setUser(res2.data.user);
    navigate("/profile");
  };

  // 🔹 Logout
  const logout = async () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
