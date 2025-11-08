import FuzzyText from "@/components/FuzzyText";
import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="">
      <Navbar pageTitle="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2">
        <DashboardCard title="Total Products" value={120} color="bg-blue-500" />
        <DashboardCard title="Total Orders" value={75} color="bg-green-500" />
        <DashboardCard title="Total Users" value={50} color="bg-yellow-500" />
        <DashboardCard title="Stock Alerts" value={5} color="bg-red-500" />
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full md:mt-40 mt-5">
        <div className="">
          <img className="w-[200px]" src="logo.png" alt="Victus Byte Logo" />
        </div>

        {/* Uncomment this if you want fuzzy text next to the logo */}

        <div className="mt-10 -mr-10 hidden md:flex">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            color="#1F2937" // Tailwind gray-800
          >
            VICTUS BYTE
          </FuzzyText>
        </div>
      </div>
    </div>
  );
}
