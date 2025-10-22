import { useContext, useState } from "react";
import { AuthContext } from "../../Context Api/AuthContext.jsx";
import { FiLoader } from "react-icons/fi";

export default function AdminRegistration() {
  const { loading } = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false); // spinner for login submit
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    profilePicture: "",
    phone: "",
    password: "",
    role: "Admin",
    status: "Active",
  });

  //for checkbox
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Data:", formData);
    setLoginLoading(true);
    // Here you can send the data to your backend API
  };



  return (
    <div className="w-full lg:max-w-xl mx-auto lg:mt-3  bg-white">
      <h2 className="text-2xl p-2 font-bold mb-4 text-center lg:mt-12 bg-gray-200">
        Register New Admin
      </h2>

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
              name="username"
              value={formData.username}
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
              name="profilePicture"
              value={formData.profilePicture}
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
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-center lg:gap-2 gap-3">
          <input
            required
            type="checkbox"
            id="confirmAdmin"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="w-4 h-4"
          />
          <label htmlFor="confirmAdmin" className="text-gray-700 mt-6 lg:mt-0">
            I confirm that I want to create a new admin account
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 w-full py-2 rounded hover:bg-blue-700 transition-all font-medium"
          >
            Register Admin
          </button>
        </div>
      </form>
    </div>
  );
}
