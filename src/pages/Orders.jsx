import OrderStatusCards from "@/components/Order/OrderStatusCards";
import Navbar from "../components/Navbar";
import OrderStatusDropdown from "@/components/Order/OrderStatusDropdown";
import OrderList from "@/components/Order/OrdersList";

export default function Orders() {
  return (
    <div>
      <Navbar pageTitle="Order Management" />
      <div>
        <OrderStatusCards />
        {/* <OrderStatusDropdown /> */}
        <OrderList />
      </div>
    </div>
  );
}
