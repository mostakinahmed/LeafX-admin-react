import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import autoTable from "jspdf-autotable";

export default function ReceiptGenerator() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const receiptRef = useRef();

  // Sample orders data
  const orders = [
    {
      id: "1001",
      customer: "John Doe",
      date: "2025-10-17",
      items: [
        { name: "Laptop Pro", quantity: 1, price: 1200 },
        { name: "Wireless Mouse", quantity: 2, price: 25 },
      ],
    },
    {
      id: "1002",
      customer: "Jane Smith",
      date: "2025-10-16",
      items: [
        { name: "Jeans Classic", quantity: 2, price: 60 },
        { name: "T-Shirt Casual", quantity: 3, price: 25 },
      ],
    },
  ];

  // Generate receipt when button is clicked
  const handleGenerate = () => {
    const trimmedId = orderId.trim();
    if (!trimmedId) {
      setOrder(null);
      return;
    }
    const foundOrder = orders.find((o) => o.id.toString() === trimmedId);
    setOrder(foundOrder || null);
  };

  // Print receipt
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt_${order ? order.id : ""}`,
  });

  // Download modern PDF
  const handleDownload = () => {
    if (!order) return;

    const doc = new jsPDF();

    // --- Company Info ---
    doc.setFontSize(16);
    doc.setTextColor(0, 70, 140); // dark blue
    doc.text("FabriBuzz E-commerce", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text("Address: 123 Market Street, Dhaka, Bangladesh", 14, 28);
    doc.text("Phone: +880 1234 567890", 14, 34);
    doc.text("Email: support@fabribuzz.com", 14, 40);

    // --- Receipt Info ---
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Receipt for Order #${order.id}`, 14, 50);

    // --- Customer Info ---
    doc.setFontSize(12);
    doc.text(`Customer Name: ${order.customer}`, 14, 58);
    doc.text(`Email: ${order.email || "customer@example.com"}`, 14, 64);
    doc.text(`Phone: ${order.phone || "+880 0000 000000"}`, 14, 70);
    doc.text(`Shipping Address: ${order.address || "Not Provided"}`, 14, 76);
    doc.text(`Date: ${order.date}`, 14, 82);

    // --- Table of Items ---
    const tableColumn = ["Item", "Quantity", "Price"];
    const tableRows = [];

    order.items.forEach((item) => {
      tableRows.push([item.name, item.quantity.toString(), `$${item.price}`]);
    });

    // Total row
    tableRows.push([
      {
        content: "Total",
        colSpan: 2,
        styles: { halign: "right", fontStyle: "bold" },
      },
      `$${order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )}`,
    ]);

    autoTable(doc, {
      startY: 90,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [0, 70, 140],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: { fontSize: 12 },
    });

    // --- Footer ---
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Thank you for shopping with FabriBuzz!",
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    doc.save(`receipt_${order.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar pageTitle="Receipt Generator" />

      <div className="max-w-4xl mx-auto p-4">
        {/* Order ID Input */}
        <div className=" lg:flex mb-6 lg:gap-5">
          <input
            type="text"
            placeholder="Enter Order ID"
            className="flex-1 p-2 mb-2 lg:mb-0 w-full border rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2   lg:px-6 rounded hover:bg-blue-600"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>

        {/* Receipt Display */}
        {order && (
          <div className="bg-white p-6 rounded shadow mb-6" ref={receiptRef}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Receipt</h2>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer}
            </p>
            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <table className="w-full mt-4 border-collapse border text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    className="border px-4 py-2 font-bold text-right"
                    colSpan={2}
                  >
                    Total:
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    $
                    {order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handlePrint}
              >
                Print
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={handleDownload}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}

        {!order && orderId && (
          <p className="text-red-500">
            Order not found. Please check the Order ID.
          </p>
        )}
      </div>
    </div>
  );
}
