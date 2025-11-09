import { useRef, useState } from "react";
import Navbar from "../Navbar";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import autoTable from "jspdf-autotable";

export default function Invoice() {
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
  // --- Download beautifully designed PDF ---
  const handleDownload = () => {
    if (!order) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;

    // --- Logo Section ---
    const logoWidth = 135;
    const logoHeight = 60;

    // If you have a logo, you can use Base64 or image URL like:
    doc.addImage(
      "/logo victus full.png",
      "PNG",
      margin,
      30,
      logoWidth,
      logoHeight
    );
    // doc.setFillColor(0, 70, 140);
    // doc.circle(margin + 30, 60, 25, "F"); // Placeholder circle logo
    // doc.setFontSize(18);
    // doc.setTextColor(0, 70, 140);
    // doc.setFont("helvetica", "bold");
    // doc.text("FabriBuzz", margin + 70, 65);
    // doc.setFontSize(11);
    // doc.setTextColor(100);
    // doc.text("E-commerce", margin + 70, 80);

    // --- Company Info (Right side) ---
    const rightX = pageWidth - margin - 200;
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Victus-Byte HQ", rightX, 40);
    doc.text("123 Market Street", rightX, 55);
    doc.text("Dhaka, Bangladesh", rightX, 70);
    doc.text("Email: support@victusbyte.com", rightX, 85);
    doc.text("Phone: +880 1234 567890", rightX, 100);

    // --- Horizontal Line ---
    doc.setDrawColor(180);
    doc.line(margin, 110, pageWidth - margin, 110);

    // --- Title ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Receipt / Invoice`, margin, 140);

    // --- Receipt Info ---
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: #${order.id}`, margin, 160);
    doc.text(`Date: ${order.date}`, margin, 175);

    // --- Customer Info (Left) ---
    const customerY = 200;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Bill To:", margin, customerY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Name: ${order.customer}`, margin, customerY + 18);
    doc.text(
      `Email: ${order.email || "customer@example.com"}`,
      margin,
      customerY + 33
    );
    doc.text(
      `Phone: ${order.phone || "+880 0000 000000"}`,
      margin,
      customerY + 48
    );
    doc.text(
      `Address: ${order.address || "Not Provided"}`,
      margin,
      customerY + 63
    );

    // --- Table Header ---
    const startTableY = customerY + 90;
    const tableColumn = ["Item", "Quantity", "Price", "Total"];
    const tableRows = [];

    order.items.forEach((item) => {
      const total = item.price * item.quantity;
      tableRows.push([
        item.name,
        item.quantity.toString(),
        `$${item.price.toFixed(2)}`,
        `$${total.toFixed(2)}`,
      ]);
    });

    const totalAmount = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    tableRows.push([
      {
        content: "Total",
        colSpan: 3,
        styles: { halign: "right", fontStyle: "bold" },
      },
      `$${totalAmount.toFixed(2)}`,
    ]);

    // --- Table Styling ---
    autoTable(doc, {
      startY: startTableY,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [0, 70, 140],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 6,
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // --- Footer ---
    const footerY = doc.internal.pageSize.height - 40;
    doc.setDrawColor(180);
    doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Thank you for shopping with Victus-Byte! Visit us again at www.victusbyte.com",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );

    // Save file
    doc.save(`receipt_${order.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Order ID Input */}
        <div className=" lg:flex mb-6 lg:gap-5">
          <input
            type="text"
            placeholder="Enter Order ID"
            className="flex-1 p-2 mb-2 lg:mb-0 w-full border-2 border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600"
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
