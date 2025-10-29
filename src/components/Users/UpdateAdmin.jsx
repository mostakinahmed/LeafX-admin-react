import { useContext, useState } from "react";
import { AuthContext } from "../../Context Api/AuthContext.jsx";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { DataContext } from "@/Context Api/ApiContext.jsx";

export default function UpdateAdmin({ back, user }) {
  const { updateApi, adminData } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // new success state

  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    userName: user.userName || "",
    email: user.email || "",
    images: user.images || "",
    phone: user.phone || "",
    password: user.password || "",
    role: user.role || "Admin",
    status: user.status !== undefined ? user.status : true,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      // convert string to boolean
      setFormData({ ...formData, [name]: value === "Active" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmed) {
      setError("Please confirm to create the admin account.");
      return;
    }

    console.log(formData);

    try {
      setError("");
      setLoading(true);
      setFormVisible(false);
      const data = formData;

      const res = await axios.put(
        `https://fabribuzz.onrender.com/api/user/admin/update/${user._id}`,
        data
      );

      if (res.status === 200) {
        updateApi(); // refresh admin list
        //console.log("Success:", res.data);
        setError("");
        setLoading(false);
        // setFormVisible(true);

        setSuccess(true); // show success popup
        // reset confirmation
        setIsConfirmed(false);
        setFormData({
          // optionally reset form
          fullName: "",
          userName: "",
          email: "",
          images: "",
          phone: "",
          password: "",
          role: "Admin",
          status: true,
        });

        // optionally reset form or redirect
      }
    } catch (err) {
      setFormVisible(true);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to register admin. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen lg:max-w-xl mx-auto lg:mt-3 bg-white">
      <h2 className="text-2xl font-bold mb-4 md:mt-10 text-center bg-gray-200 p-2 rounded">
        Update Admin
      </h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-30 inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow flex flex-col items-center animate-fadeIn">
            <FaSpinner className="text-blue-500 text-6xl animate-spin mb-4" />
            <p className="text-gray-700 font-semibold text-lg">
              Please wait...
            </p>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {success && (
        <div className=" md:mt-30 mt-20 inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white md:p-8 py-8 px-6 rounded shadow flex flex-col items-center animate-fadeIn">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <p className="text-gray-700 font-semibold md:text-lg">
              Admin update successfully!
            </p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={() => {
                setSuccess(false);
                back();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Mostakin Ahmed"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="mostakin111111"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="+880123456789"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Security & Login Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={formData.status ? "Active" : "Suspended"}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-center gap-3">
            <input
              required
              type="checkbox"
              id="confirmAdmin"
              checked={isConfirmed}
              onChange={() => setIsConfirmed(!isConfirmed)}
              className="w-4 h-4"
            />
            <label htmlFor="confirmAdmin" className="text-gray-700">
              I confirm that I want to update an admin account
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-600 font-medium bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center flex gap-3">
            <button
              onClick={back}
              type="button"
              className="bg-red-600 text-white px-6 w-full py-2 rounded hover:bg-red-700 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 w-full py-2 rounded hover:bg-blue-700 transition-all font-medium"
            >
              Update Admin
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
