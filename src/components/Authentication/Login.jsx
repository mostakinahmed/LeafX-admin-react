import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context Api/AuthContext";
import { FiLoader, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorInfo("");

    try {
      await login(formData.email, formData.password);
      navigate("/"); // redirect after success
    } catch (err) {
      // Backend error handling
      if (err.status) {
        if (err.status === 403) {
          setErrorInfo("suspended");
        } else if (err.status === 404) {
          setErrorInfo("❌ User not found.");
        } else if (err.status === 401) {
          setErrorInfo("⚠️ Invalid email or password.");
        } else {
          setErrorInfo("⚠️ Something went wrong. Please try again.");
        }
      } else {
        setErrorInfo("⚠️ Network error. Please check your connection.");
      }
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

  // Login submission loading
  if (loginLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <FiLoader className="text-6xl text-blue-500 animate-spin" />
        <p className="mt-4 text-blue-600 text-lg font-semibold animate-pulse">
          Logging in...
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm bg-white rounded-md shadow border border-gray-100 overflow-hidden"
      >
        <div className="bg-blue-600 text-center w-full">
          <p className="text-white p-1 text-xl">Admin Panel</p>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center py-2 pb-9">
          <img
            src="/logo victus full.png"
            alt="Victus Byte Logo"
            className="h-16 w-auto mb-2"
          />
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5 px-8 pb-8"
        >
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorInfo && errorInfo !== "suspended" && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-md mt-2 text-center"
            >
              {errorInfo}
            </motion.p>
          )}

          {/* Suspended Account */}
          {errorInfo === "suspended" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mt-2"
            >
              <p className="text-red-600 text-md text-center mb-2">
                Your account is suspended. <br /> Please contact Admin.
              </p>
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loginLoading}
            className={`w-full py-2 rounded font-medium shadow-md transition-all ${
              loginLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-400 text-sm mb-4"
        >
          © {new Date().getFullYear()} Victus Byte Admin Panel
        </motion.p>
      </motion.div>
    </div>
  );
}
