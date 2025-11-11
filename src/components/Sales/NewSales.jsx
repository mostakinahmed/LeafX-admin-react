import React, { useContext, useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "@/Context Api/ApiContext";

// Mock DB data
const mockCustomers = [
  {
    id: "CUS-0001",
    phone: "01711111111",
    name: "Rahim Uddin",
    address: "House 12, Road 5",
  },
  {
    id: "CUS-0002",
    phone: "01722222222",
    name: "Karim Ahmed",
    address: "House 45, Road 12",
  },
];

const AdminSaleFull = () => {
  const { productData } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  //random OID
  function generateOrderId() {
    const timestamp = Date.now().toString().slice(-5); // last 5 digits of time
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 random digits
    return `OID25${timestamp}${randomNum}`; // OID-12345-67890
  }

  //Order Date and Time
  function getOrderDateTime12h() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 -> 12 for 12 AM
    const hoursStr = String(hours).padStart(2, "0");
    return `${year}-${month}-${day}   ${hoursStr}:${minutes} ${ampm}`;
  }

  const [order, setOrder] = useState({
    order_id: generateOrderId(),
    customer_id: "",
    order_date: getOrderDateTime12h(),
    status: "Pending",
    Mode: "Online",
    subtotal: 0,
    shipping_cost: "",
    discount: "",
    total_amount: 0,
    payment: { method: "COD", status: "Pending" },
    shipping_address: { recipient_name: "", phone: "", address_line1: "" },
    items: [
      { product_id: "", product_name: "", quantity: 1, product_price: 0 },
    ],
  });

  // 🧭 handle customer auto-fill by phone
  const handleCustomerPhone = (phone) => {
    const customer = mockCustomers.find((c) => c.phone === phone);
    setOrder((prev) => ({
      ...prev,
      customer_id: customer ? customer.id : "",
      shipping_address: {
        ...prev.shipping_address,
        phone,
        recipient_name: customer?.name || "",
        address_line1: customer?.address || "",
      },
    }));
  };

  // 🧮 handle product fields
  const handleItemChange = (idx, field, value) => {
    const items = [...order.items];

    if (field === "product_id") {
      items[idx][field] = value;
      const product = productData.find((p) => p.pID === value);
      if (product) {
        items[idx] = {
          ...items[idx],
          product_id: product.pID,
          product_name: product.name,
          product_comments: product.comments,
          product_price: product.price || 0,
        };
      }
    } else if (field === "quantity" || field === "product_price") {
      items[idx][field] = Number(value);
    } else {
      items[idx][field] = value;
    }

    setOrder((prev) => ({ ...prev, items }));
  };

  // ➕ Add/Remove item
  const addItem = () =>
    setOrder((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { product_id: "", product_name: "", quantity: 1, product_price: 0 },
      ],
    }));

  const removeItem = (idx) => {
    const items = order.items.filter((_, i) => i !== idx);
    setOrder((prev) => ({ ...prev, items }));
  };

  // 🧾 Auto calculate subtotal & total
  useEffect(() => {
    const subtotal = order.items.reduce(
      (sum, i) => sum + i.product_price * i.quantity,
      0
    );
    const shipping = Number(order.shipping_cost || 0);
    const discount = Number(order.discount || 0);
    const total_amount = subtotal + shipping - discount;

    setOrder((prev) => ({ ...prev, subtotal, total_amount }));
  }, [order.items, order.shipping_cost, order.discount]);

  // 🧮 Input handlers for shipping/discount
  const handleShippingChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setOrder((prev) => ({ ...prev, shipping_cost: value }));
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setOrder((prev) => ({ ...prev, discount: value }));
  };

  // 💾 Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (order.shipping_cost === "" || order.discount === "") {
      alert("Please fill in Shipping Cost and Discount");
      return;
    }
    console.log("Order Saved:", order);
    alert("Order saved successfully!");
  };

  return (
    <div className="max-w-full mx-auto">
      <Navbar pageTitle="Create New Sale" />

      <form
        onSubmit={handleSubmit}
        className="space-y-2 min-h-screen bg-white shadow rounded p-2"
      >
        {/* 🧾 Order Info */}
        <div className="space-y-2 rounded">
          <h3 className="font-semibold rounded text-gray-700 p-2 bg-gray-200">
            Order Info
          </h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">Order ID</label>
              <input
                type="text"
                value={order.order_id}
                readOnly
                className="border px-2 py-1 rounded w-64 bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">
                Order Date & Time
              </label>
              <input
                type="text"
                value={order.order_date}
                readOnly
                className="border px-2 py-1 rounded w-64 bg-gray-100"
              />
            </div>

            <div className="flex flex-col w-32">
              <label className="ml-2 text-gray-600 text-sm">Status</label>
              <select
                value={order.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
                className="border px-1 py-1 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="flex flex-col w-32">
              <label className="ml-2 text-gray-600 text-sm">Mode</label>
              <select
                value={order.Mode}
                onChange={(e) => setOrder({ ...order, Mode: e.target.value })}
                className="border px-2 py-1 rounded"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>
        </div>

        {/* 👨‍👩‍👧 Customer Info */}
        <div className="space-y-2 mt-8">
          <h3 className="font-semibold text-gray-700 p-2 bg-gray-200">
            Customer Info
          </h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">Phone Number</label>
              <input
                type="text"
                placeholder="+8801XXXXXXXXX"
                value={order.shipping_address.phone}
                onChange={(e) => handleCustomerPhone(e.target.value)}
                className="border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Md. Mostakin Ahmed"
                value={order.shipping_address.recipient_name}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    shipping_address: {
                      ...order.shipping_address,
                      recipient_name: e.target.value,
                    },
                  })
                }
                className="border px-2 py-1 rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">Full Address</label>
              <input
                type="text"
                placeholder="93, Indira Road, Dhaka"
                value={order.shipping_address.address_line1}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    shipping_address: {
                      ...order.shipping_address,
                      address_line1: e.target.value,
                    },
                  })
                }
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>
        </div>

        {/* 📦 Product List */}
        <div className="space-y-2 mt-8">
          <h3 className="font-semibold text-gray-700 p-2 bg-gray-200">
            Products
          </h3>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-2 flex-wrap items-center border-b border-gray-200 pb-2"
            >
              <div className="flex flex-col w-full lg:w-auto">
                <label className="ml-2 text-gray-600 text-sm">Product ID</label>
                <input
                  type="text"
                  placeholder="P00000X"
                  required
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(idx, "product_id", e.target.value)
                  }
                  className="border px-2 py-1 rounded lg:w-28 w-full"
                />
              </div>
              <div className="lg:ml-2 flex flex-col lg:w-auto w-full">
                <label className="ml-2 text-gray-600 text-sm">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Example: Samsung S24 Ultra"
                  value={item.product_name}
                  onChange={(e) =>
                    handleItemChange(idx, "product_name", e.target.value)
                  }
                  className="border px-2 py-1 rounded flex-1 lg:w-[30rem]"
                  required
                />
              </div>

              <div className="lg:ml-2 flex gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.product_price}
                    onChange={(e) =>
                      handleItemChange(idx, "product_price", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-30"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm">Qty</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-30"
                    required
                  />
                </div>
              </div>

              {/* comments */}
              <div className="lg:ml-2 flex flex-col lg:w-auto w-full">
                <label className="ml-2 text-green-600 font-bold text-md">
                  Comments - Primary Info
                </label>
                <input
                  type="text"
                  placeholder="Example: 8/128 GB , black, USA"
                  required
                  value={item.product_comments}
                  onChange={(e) =>
                    handleItemChange(idx, "product_comments", e.target.value)
                  }
                  className="border px-2 py-1 rounded flex-1 lg:w-[30rem]"
                />
              </div>

              {order.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="bg-red-500 text-white p-1 rounded mt-5"
                >
                  <Minus className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-blue-600 font-medium mt-2"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {/* 💳 Payment & Shipping */}
        <div className="space-y-2 mt-8">
          <h3 className="font-semibold text-gray-700 p-2 bg-gray-200">
            Payment & Shipping
          </h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">
                Shipping Cost
              </label>
              <input
                type="number"
                placeholder="0"
                required
                value={order.shipping_cost}
                onChange={handleShippingChange}
                className="border px-2 py-1 rounded w-32"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">Discount</label>
              <input
                type="number"
                placeholder="0"
                required
                value={order.discount}
                onChange={handleDiscountChange}
                className="border px-2 py-1 rounded w-32"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">
                Payment Method
              </label>
              <select
                value={order.payment.method}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    payment: { ...order.payment, method: e.target.value },
                  })
                }
                className="border px-2 py-1 rounded w-32"
              >
                <option value="COD">COD</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-600 text-sm">
                Payment Status
              </label>
              <select
                value={order.payment.status}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    payment: { ...order.payment, status: e.target.value },
                  })
                }
                className="border px-2 py-1 rounded w-32"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* 💰 Totals */}
        <div className="flex justify-between rounded mt-8 font-semibold text-lg py-2 px-2 bg-gray-200">
          <span>Subtotal: ${order.subtotal.toFixed(2)}</span>
          <span>Total: ${order.total_amount.toFixed(2)}</span>
        </div>

        {/* 🧾 Buttons */}
        <div className="mt-2">
          <button
            type="submit"
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Save Order
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 bg-red-600 ml-4 hover:bg-red-700 text-white py-2 rounded font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSaleFull;
