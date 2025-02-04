import { useState } from "react";

const IssuePurchaseOrder = ({
  issuePurchaseOrderModel,
  setIssuePurchaseOrderModel,
  createPurchaseOrder,
}) => {
  // Form state'leri
  const [materialType, setMaterialType] = useState("");
  const [quantity, setQuantity] = useState("");

  // Sipariş oluşturma ve hata kontrolü
  const handleSubmit = async () => {
    try {
      if (!materialType || !quantity) {
        alert("Please fill out all fields!"); // Alanlar boşsa uyarı
        return;
      }

      const orderData = await createPurchaseOrder(materialType, quantity);
      console.log("Order Created:", orderData);
      alert("Order successfully created!");

      // Formu temizle ve modalı kapat
      setMaterialType("");
      setQuantity("");
      setIssuePurchaseOrderModel(false);
    } catch (error) {
      console.error("Error creating purchase order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  // Modal görünürlüğü kontrolü
  return issuePurchaseOrderModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* Modal arka planı */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setIssuePurchaseOrderModel(false)}
      ></div>

      {/* Modal içeriği */}
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg">
          {/* Kapatma butonu */}
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setIssuePurchaseOrderModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Başlık */}
          <h4 className="text-lg font-medium text-center text-gray-800">
            Create Purchase Order
          </h4>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()} // Formun yeniden yüklenmesini engelle
            className="space-y-4 mt-4"
          >
            {/* Material Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Material Type
              </label>
              <input
                type="text"
                placeholder="Enter material type"
                className="w-full px-4 py-2 text-gray-500 bg-transparent border rounded-lg focus:border-indigo-600 focus:outline-none"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 text-gray-500 bg-transparent border rounded-lg focus:border-indigo-600 focus:outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Submit Butonu */}
            <button
              onClick={handleSubmit}
              className="block w-full py-2 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null; // Modal kapalıysa hiçbir şey render etme
};

export default IssuePurchaseOrder;
