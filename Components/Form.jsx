import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default ({
  setCreateTrackingModel,
  createTrackingModel,
  createTracking,
}) => {
  const [tracking, setTracking] = useState({
    sender: "", // Otomatik olarak Metamask'ten alınacak
    receiver: "",
    orderId: "",
    materialType: "",
    quantity: "",
    pickUpTime: "", // Tarih formatı: YYYY-MM-DD
    distance: "",
    price: "",
    isPaid: false,
    status: 0, // Varsayılan olarak "Created" durumunu temsil eder
  });

  // Metamask'ten hesabı alma işlemi
  useEffect(() => {
    const fetchSenderAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setTracking((prevState) => ({
            ...prevState,
            sender: accounts[0], // İlk hesabı otomatik olarak sender olarak ayarla
          }));
        } catch (error) {
          console.error("Error fetching Metamask account:", error);
        }
      } else {
        console.error("Metamask not detected!");
      }
    };

    fetchSenderAddress();
  }, []);

  const createItem = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      // MetaMask ile Ethereum ağına bağlanıyoruz
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // MetaMask cüzdanını bağla
      const signer = provider.getSigner();

      // Burada, smart contract adresi ve ABI kullanılarak kontrat işlemleri yapılabilir.
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Smart contract adresinizi buraya ekleyin
      const contractABI = [
        // Smart contract ABI'nizi buraya ekleyin
        "function createOrder(address receiver, string materialType, uint quantity, uint pickUpTime, uint distance, uint price, bool isPaid) public"
      ];

      // Smart contract nesnesi oluşturuluyor
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // İşlem parametrelerini hazırlayın
      const receiver = tracking.receiver;
      const materialType = tracking.materialType;
      const quantity = tracking.quantity;
      const pickUpTime = new Date(tracking.pickUpTime).getTime() / 1000; // Unix timestamp'a dönüştür
      const distance = tracking.distance;
      const price = tracking.price;
      const isPaid = tracking.isPaid;

      // Smart contract fonksiyonunu çağırıyoruz
      const tx = await contract.createOrder(
        receiver,
        materialType,
        quantity,
        pickUpTime,
        distance,
        price,
        isPaid
      );

      // İşlem hash'ini alıyoruz
      console.log("Transaction Hash:", tx.hash);

      // İşlem onayını bekliyoruz, ancak burası artık opsiyonel
      try {
        await tx.wait(); // Bu satır, işlem onayını bekleyecek. Eğer işlem onaylanmazsa hata vermez.
        alert("Transaction successful!");
      } catch (error) {
        console.error("Transaction not confirmed:", error);
        // İşlem onaylanmazsa bile devam edebiliriz
      }

      // Bu adım her durumda yapılacak
      await createTracking(tracking); // Listeye eklemeyi her durumda yapıyoruz
      setCreateTrackingModel(false); // Form gönderildikten sonra kapat
    } catch (error) {
      console.error("An error occurred while creating the tracking item:", error);
    }
  };

  return createTrackingModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateTrackingModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateTrackingModel(false)}
            >
              <svg
                xmlns="https://www.w3.org/2000/svg"
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
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Create Material Order Tracking
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Receiver */}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>

              {/* Order ID */}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Order ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      orderId: e.target.value,
                    })
                  }
                />
              </div>

              {/* Material Type */}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Material Type"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      materialType: e.target.value,
                    })
                  }
                />
              </div>

              {/* Quantity */}
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>

              {/* Pick-Up Time */}
              <div className="relative mt-3">
                <input
                  type="date"
                  value={tracking.pickUpTime}
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      pickUpTime: e.target.value,
                    })
                  }
                />
                <p className="text-sm text-gray-500 mt-2">
                  Selected Date:{" "}
                  {tracking.pickUpTime
                    ? new Date(tracking.pickUpTime).toLocaleDateString("en-US")
                    : "Not Selected"}
                </p>
              </div>

              {/* Distance */}
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Distance (km)"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      distance: e.target.value,
                    })
                  }
                />
              </div>

              {/* Price */}
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setTracking({
                      ...tracking,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              {/* Paid Status */}
              <div className="relative mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600"
                    onChange={(e) =>
                      setTracking({
                        ...tracking,
                        isPaid: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-gray-700">Paid</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={createItem}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Create Tracking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
