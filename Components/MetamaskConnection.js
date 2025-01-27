import React, { useState } from "react";
import { ethers } from "ethers";

const MetamaskConnection = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        // Kullanıcının cüzdan adresine erişim izni al
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        setConnected(true);
        console.log("Metamask connected with address:", address);
      } catch (error) {
        console.log("User rejected connection or error occurred:", error);
      }
    } else {
      console.log("Metamask is not installed");
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectMetamask} className="btn btn-primary">
          Connect Metamask
        </button>
      ) : (
        <div>
          <p>Connected Address: {userAddress}</p>
        </div>
      )}
    </div>
  );
};

export default MetamaskConnection;
