// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Airline {
    address public owner;

    struct Customer {  
        uint loyaltyPoints;
        uint totalFlights;
    }

    struct Flight {
        string name;
        uint256 price;
    }

    uint etherPerPoint = 0.1 ether;

    Flight[] public flights;

    mapping(address => Customer) public customers;
    mapping(address => Flight[]) public customerFlights;
    mapping(address => uint) public customerTotalFlights;

    event FlightPurchased(address indexed customer, uint price);

    constructor() {
        owner = msg.sender;
        flights.push(Flight('Tokio', 4 ether));
        flights.push(Flight('Germany', 3 ether));
        flights.push(Flight('Madrid', 3 ether));
    }

    function buyFlight(uint flightIndex) public payable {
        
        Flight memory flight = flights[flightIndex];
        require(msg.value == flight.price);

        Customer storage customer = customers[msg.sender];
        customer.loyaltyPoints += 5;
        customer.totalFlights += 1;
        customerFlights[msg.sender].push(flight);
        customerTotalFlights[msg.sender] ++;

        emit FlightPurchased(msg.sender, flight.price);
    }

    function totalFlights() public view returns (uint) {
        return flights.length;
    }

    function redeemLoyaltyPoints() public {
        Customer storage customer = customers[msg.sender];
        uint etherToRefund = etherPerPoint * customer.loyaltyPoints;
        payable(msg.sender).transfer(etherToRefund);
        customer.loyaltyPoints = 0;
    }

    function getEtherPerPoint() public view returns (uint) {
        return etherPerPoint;
    }

    function getRefundableEther() public view returns (uint) {
        uint etherToRefund = etherPerPoint * customers[msg.sender].loyaltyPoints;
        return etherToRefund;
    }
    
    function getAirlineBalance() public isOwner view returns (uint) {
        address airlineAddress = address(this);
        return airlineAddress.balance; 
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

}