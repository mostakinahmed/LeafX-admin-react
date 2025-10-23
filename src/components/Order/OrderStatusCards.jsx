import React from "react";
import {
  Package,
  CheckCircle,
  Truck,
  ShoppingBag,
  CalendarDays,
  XCircle,
  Layers,
} from "lucide-react";

const OrderStatusCards = () => {
  // Example data — replace with your dynamic order counts later
  const orderStats = [
    {
      title: "Today's Orders",
      count: 6,
      icon: CalendarDays,
      color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    },
    {
      title: "Pending Orders",
      count: 12,
      icon: Package,
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    {
      title: "Confirmed Orders",
      count: 8,
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    {
      title: "Shipped Orders",
      count: 5,
      icon: Truck,
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
    {
      title: "Delivered Orders",
      count: 20,
      icon: ShoppingBag,
      color: "bg-green-100 text-green-700 border-green-300",
    },
    {
      title: "Cancelled Orders",
      count: 2,
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-300",
    },
    {
      title: "All Orders",
      count: 53,
      icon: Layers,
      color: "bg-gray-100 text-gray-700 border-gray-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-7 xl:grid-cols-7 gap-2 lg:gap-3 mb-2">
      {orderStats.map(({ title, count, icon: Icon, color }, idx) => (
        <div
          key={idx}
          className={`border ${color} p-4 rounded lg:h-18 h-22 shadow-sm flex items-center justify-between transition-transform hover:scale-105 hover:shadow-md`}
        >
          <div>
            <h4 className="text-sm font-medium text-gray-600">{title}</h4>
            <p className="text-2xl font-bold mt-1">{count}</p>
          </div>
          <Icon className="w-8 h-8 opacity-80" />
        </div>
      ))}
    </div>
  );
};

export default OrderStatusCards;
