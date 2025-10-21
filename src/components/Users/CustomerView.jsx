import React from "react";

const order = [
  { id: "O1001", date: "2025-10-01", amount: 120.5, status: "Pending" },
  { id: "O1002", date: "2025-10-02", amount: 250, status: "Completed" },
  { id: "O1003", date: "2025-10-03", amount: 75, status: "Cancelled" },
  { id: "O1004", date: "2025-10-04", amount: 310, status: "Processing" },
];

// Props: user (object), orders (array)
export default function CustomerView({ user, goBack }) {
  return (
    <div className="space-y-2">
      <div className="w-full flex justify-between h-10 py-1 px-2 mt-5 text-xl bg-gray-200">
        <h1>Customer Info</h1>
        <button
          onClick={goBack}
          className="px-4 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white w-full mx-auto flex flex-col sm:flex-row gap-2">
        {/* Left: Avatar & Username */}
        <div className="flex flex-col items-center sm:items-start sm:w-1/3">
          <img
            src="https://i.ibb.co.com/RkQyDx1v/Untitled-design-1.png"
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          {/* {user.images ? (
            <img
              src="https://i.ibb.co.com/RkQyDx1v/Untitled-design-1.png"
              alt={user.fullName}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl mb-2">
              {user.fullName[0]}
            </div>
          )} */}
          <h2 className="text-2xl font-bold">{user.fullName}</h2>
        </div>

        {/* Right: User Info */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6 whitespace-break-spaces">
          <div>
            <p className="text-gray-500 font-semibold">Username</p>
            <p>@{user.username}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">User ID</p>
            <p>{user.id}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Email</p>
            <p className="truncate">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Status</p>
            <p>{user.status || "Active"}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Phone</p>
            <p className="text-green-600 font-bold text-lg underline ">
              {user.phone || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Role</p>
            <p>{user.admin ? "Admin" : "Customer"}</p>
          </div>

          <div>
            <p className="text-gray-500 font-semibold">Created</p>
            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Last Login</p>
            <p>
              {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white w-full  mx-auto">
        <div className="w-full h-10 py-2 px-2 mt-5 text-xl bg-yellow-300">
          Order List
        </div>
        {order && order.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 whitespace-nowrap">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left border-b">Order ID</th>
                  <th className="px-4 py-2 text-left border-b">Date</th>
                  <th className="px-4 py-2 text-left border-b">Amount</th>
                  <th className="px-4 py-2 text-left border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{order.id}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b">${order.amount}</td>
                    <td className="px-4 py-2 border-b">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No orders found.</p>
        )}
      </div>
    </div>
  );
}
