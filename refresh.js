import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://your-api.com/api/admins");
      setAdmins(res.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🔄 Function to call after add/update/delete
  const refreshAdmins = () => {
    fetchAdmins();
  };

  return (
    <AdminContext.Provider value={{ admins, loading, refreshAdmins }}>
      {children}
    </AdminContext.Provider>
  );
};
