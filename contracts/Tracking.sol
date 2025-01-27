//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Tracking{

    struct MaterialOrder {
        uint orderID;
        string materialType;
        uint quantity;
        string status; // status of the order: Ordered, Produced, Shipped, Delivered, Accepted
        uint productionDate;
        uint shippingDate;
        uint deliveryDate;
        uint acceptanceDate;
    }

    //it is going to keep track of the order
    mapping(uint => MaterialOrder) public orders;  // Orders will be stored with orderID

    uint public nextOrderId; //ID for new order


    //Creation of the order
    function IssuePurchaseOrder(string memory _materialType, uint _quantity) public {
        uint orderId = nextOrderId++;  // ID is created for new order and increased
        orders[orderId] = MaterialOrder(orderId, _materialType, _quantity, "Ordered", 0,0,0,0); 
    }


    //Update the status when the material is produced
    function MaterialProduction (uint _orderId) public{
        require(_orderId < nextOrderId, "Invalid order ID");  // Check whether the order ID is valid
        MaterialOrder storage order = orders[_orderId];
        //check whether the current status of the order is "Ordered"
        require(keccak256(bytes(order.status)) == keccak256(bytes("Ordered")), "Order has already been produced");
        order.status = "Produced";  //update the order to "Produced" 
        order.productionDate = block.timestamp;
    }


    // Update the status when transporting the material
    function TransportMaterial(uint _orderId) public {
        require(bytes(orders[_orderId].status).length != 0, "Order not found");
        //Check whether the status of the order is "Produced"
        require(keccak256(bytes(orders[_orderId].status)) == keccak256(bytes("Produced")), "Order not produced yet");
        orders[_orderId].status = "Shipped";
        orders[_orderId].shippingDate = block.timestamp;  
    }


    // Update the status when material is delivered 
    function DeliverMaterial(uint _orderId) public {
        require(bytes(orders[_orderId].status).length != 0, "Order not found");
        require(keccak256(bytes(orders[_orderId].status)) == keccak256(bytes("Shipped")), "Order not shipped yet");

        orders[_orderId].status = "Delivered";
        orders[_orderId].deliveryDate = block.timestamp;  
    }

    // Update the status when material is accepted
    function AcceptMaterial(uint _orderId) public {
        require(bytes(orders[_orderId].status).length != 0, "Order not found");
        require(keccak256(bytes(orders[_orderId].status)) == keccak256(bytes("Delivered")), "Order not delivered yet");

        orders[_orderId].status = "Accepted";
        orders[_orderId].acceptanceDate = block.timestamp; 
    }

    // Query the status and date information of the order 
    function getOrderStatus(uint _orderId) public view returns (string memory status, uint productionDate, uint shippingDate, uint deliveryDate, uint acceptanceDate) {
        require(bytes(orders[_orderId].status).length != 0, "Order not found");

        MaterialOrder memory order = orders[_orderId];
        return (order.status, order.productionDate, order.shippingDate, order.deliveryDate, order.acceptanceDate);
    }

}

