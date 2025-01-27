import React, { useState, useEffect } from "react";

// INTERNAL IMPORT
import {
  ConnectWallet,
  IssuePurchaseOrder,
  MaterialProduction,
  TransportMaterial,
  DeliverMaterial,
  AcceptMaterial,
  getOrderStatus,
  Services,
  Table,
  Form,
  Profile
} from "../Components";

const Index = () => {
  // STATE VARIABLES
  const [materialType, setMaterialType] = useState(""); // Material type input state
  const [quantity, setQuantity] = useState(""); // Quantity input state
  const [orderId, setOrderId] = useState(""); // Order ID input state
  const [orderDetails, setOrderDetails] = useState(null); // Order details state (fetched status)
  const [loading, setLoading] = useState(false); // Loading state for transaction calls

  // UI-specific states
  const [openProfile, setOpenProfile] = useState(false); // Profile modal state
  const [createTrackingModel, setCreateTrackingModel] = useState(false); // Form modal state
  const [allData, setAllData] = useState([]); // Data for Table component

  // Modal state for issuePurchaseOrder
  const [completeModal, setCompleteModal] = useState(false); // Modal state for complete
  const [getModel, setGetModel] = useState(false); // Modal state for get model
  const [startModal, setStartModal] = useState(false); // Modal state for start

  // Fetch order details whenever the orderId changes
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          setLoading(true);
          const details = await getOrderStatus(orderId);
          setOrderDetails(details);
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const [issuePurchaseOrderModel, setIssuePurchaseOrderModel] = useState(false);
  const createPurchaseOrder = async (materialType, quantity) => {
    console.log("Creating Purchase Order:", { materialType, quantity });
    return { id: Date.now(), materialType, quantity }; // Örnek veri
  };

  // Tracking oluşturma işlevi
  const createTracking = (tracking) => {
    setAllData((prevData) => {
      const updatedData = [...prevData, tracking];
      console.log("Updated allData:", updatedData);
      return updatedData;
    });
  };

  return (
    <div>
      <h1>Material Tracking DApp</h1>

      {/* Services Section */}
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />

      {/* Table Section */}
      <Table
        setCreateTrackingModel={setCreateTrackingModel}
        allData={allData}
      />

      {/* Form Section */}
      <Form
        createTrackingModel={createTrackingModel}
        createTracking={createTracking}
        setCreateTrackingModel={setCreateTrackingModel}
      />

    

      {/* Issue Purchase Order */}
    
      <IssuePurchaseOrder
        materialType={materialType}
        setMaterialType={setMaterialType}
        quantity={quantity}
        setQuantity={setQuantity}
        setLoading={setLoading}
      />

      {/* Material Production */}
      
      <MaterialProduction
        orderId={orderId}
        setOrderId={setOrderId}
        setLoading={setLoading}
      />

      {/* Transport Material */}
    
      <TransportMaterial
        orderId={orderId}
        setOrderId={setOrderId}
        setLoading={setLoading}
      />

      {/* Deliver Material */}
    
      <DeliverMaterial
        orderId={orderId}
        setOrderId={setOrderId}
        setLoading={setLoading}
      />

      {/* Accept Material */}
     
      <AcceptMaterial
        orderId={orderId}
        setOrderId={setOrderId}
        setLoading={setLoading}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Index;
