import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context Api/AuthContext";
import { FiLoader } from "react-icons/fi";

export default function Login() {
  const { login, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false); // spinner for login submit
  const [errorInfo, setErrorInfo] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setErrorInfo(true);
    } finally {
      setLoginLoading(false);
    }
  };

  // Initial auth check loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  //  Login submission loading

  if (loginLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* React Icon Spinner */}
        <FiLoader className="text-6xl text-blue-500 animate-spin" />

        <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">
          Logging in...
        </p>
      </div>
    );
  }

  return (
    <div className=" p-5 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-blue-700 tracking-tight"
          >
            Admin: Mostakin
          </motion.h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please sign in to continue
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            {errorInfo && (
              <p className="text-red-500 text-sm mt-2 text-center">
                ❌  Invalid email or password. Please try again.
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md"
          >
            Login
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 text-sm mt-6"
        >
          © {new Date().getFullYear()} Admin Panel
        </motion.p>
      </motion.div>
    </div>
  );
}
