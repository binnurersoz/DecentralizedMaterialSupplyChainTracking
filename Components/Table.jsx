import React from "react";

const Table = ({ setCreateTrackingModel, allData }) => {
  // Convert timestamp to readable date format
  const convertTime = (time) => {
    const newTime = new Date(time * 1000); // Unix timestamp to milliseconds
    return newTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Map status codes to readable statuses
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "Created";
      case 1:
        return "In Production";
      case 2:
        return "Delivered";
      case 3:
        return "Accepted";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      {/* Header Section */}
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Material Order Tracking
          </h3>
          <p className="text-gray-600 mt-2">Track the status of all material orders.</p>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setCreateTrackingModel(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium
            bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg"
          >
            Add Tracking
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Material Type</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">PickUp Time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allData?.map((order, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{order.sender || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.receiver || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.materialType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.pickUpTime ? convertTime(order.pickUpTime) : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.distance ? `${order.distance} Km` : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.price || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? "Completed" : "Not Paid"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatus(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
