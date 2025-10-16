import Navbar from "../components/Navbar";

export default function Stock() {
  return (
    <div>
      <Navbar pageTitle="Stock Management" />

      <div>
        <p className="text-gray-600">
          Here you can manage product stock levels.
        </p>
      </div>
    </div>
  );
}
