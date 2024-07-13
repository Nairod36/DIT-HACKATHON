// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract UserStorage is ReentrancyGuard {
    // Mapping to store user addresses
    mapping(address => bool) private storedAddresses;

    // Event to log the storage of a new address
    event AddressStored(address indexed userAddress);

    // Function to store a new user address
    function storeUserAddress(address userAddress) external nonReentrant {
        // Check if the address is already stored
        require(!storedAddresses[userAddress], "Address is already stored");

        // Store the address
        storedAddresses[userAddress] = true;

        // Emit event
        emit AddressStored(userAddress);
    }

    // Function to check if an address is already stored
    function isAddressStored(address userAddress) external view returns (bool) {
        return storedAddresses[userAddress];
    }
}