import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import tracking from "../Context/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // STATE VARIABLES
  const [currentUser, setCurrentUser] = useState("");
  const DappName = "Material Tracking DApp";

  // Issue a new purchase order
  const issuePurchaseOrder = async (materialType, quantity) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.issuePurchaseOrder(materialType, quantity);
      await tx.wait();
      console.log("Order issued:", tx);
    } catch (error) {
      console.log("Error issuing purchase order:", error);
    }
  };

  // Update material production
  const MaterialProduction = async (orderId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.MaterialProduction(orderId);
      await tx.wait();
      console.log("Material produced:", tx);
    } catch (error) {
      console.log("Error in material production:", error);
    }
  };

  // Transport material
  const TransportMaterial = async (orderId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.transportMaterial(orderId);
      await tx.wait();
      console.log("Material transported:", tx);
    } catch (error) {
      console.log("Error transporting material:", error);
    }
  };

  // Deliver material
  const DeliverMaterial = async (orderId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.deliverMaterial(orderId);
      await tx.wait();
      console.log("Material delivered:", tx);
    } catch (error) {
      console.log("Error delivering material:", error);
    }
  };

  // Accept material
  const AcceptMaterial = async (orderId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.acceptMaterial(orderId);
      await tx.wait();
      console.log("Material accepted:", tx);
    } catch (error) {
      console.log("Error accepting material:", error);
    }
  };

  // Get order status
  const getOrderStatus = async (orderId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const order = await contract.getOrderStatus(orderId);
      return {
        status: order.status,
        productionDate: new Date(order.productionDate * 1000).toLocaleString(),
        shippingDate: new Date(order.shippingDate * 1000).toLocaleString(),
        deliveryDate: new Date(order.deliveryDate * 1000).toLocaleString(),
        acceptanceDate: new Date(order.acceptanceDate * 1000).toLocaleString(),
      };
    } catch (error) {
      console.log("Error fetching order status:", error);
    }
  };

  // Check if wallet is connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log("Error checking wallet connection:", error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        DappName,
        currentUser,
        connectWallet,
        issuePurchaseOrder,
        MaterialProduction,
        TransportMaterial,
        DeliverMaterial,
        AcceptMaterial,
        getOrderStatus,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
