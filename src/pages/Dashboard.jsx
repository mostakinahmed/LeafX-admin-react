import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar pageTitle="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Products" value={120} color="bg-blue-500" />
        <DashboardCard title="Total Orders" value={75} color="bg-green-500" />
        <DashboardCard title="Total Users" value={50} color="bg-yellow-500" />
        <DashboardCard title="Stock Alerts" value={5} color="bg-red-500" />
      </div>
    </div>
  );
}
