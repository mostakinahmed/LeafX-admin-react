// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

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

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "https://fabribuzz.onrender.com/api/user/admin/signin",
        { email, password }
      );

      // Save token
      Cookies.set("token", res.data.token);

      // Verify user after login
      const token = Cookies.get("token");
      const res2 = await axios.post(
        "https://fabribuzz.onrender.com/api/user/admin/check-auth",
        { token }
      );

      setUser(res2.data.user);
      return res2.data.user; // return user data to Login component
    } catch (error) {
      // 🔹 Throw error with response so Login.jsx can handle it
      if (error.response) {
        throw error.response;
      } else {
        throw { status: 500, data: { message: "Network or server error" } };
      }
    }
  };

  // 🔹 Signup
  const signup = async (data) => {
    try {
      const res = await axios.post(
        "https://fabribuzz.onrender.com/api/user/signup",
        data
      );

      Cookies.set("token", res.data.tokenLast);

      const token = Cookies.get("token");
      const res2 = await axios.post(
        "https://fabribuzz.onrender.com/api/user/check-auth",
        { token }
      );
      setUser(res2.data.user);
      navigate("/profile");
    } catch (error) {
      throw (
        error.response || { status: 500, data: { message: "Signup error" } }
      );
    }
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
