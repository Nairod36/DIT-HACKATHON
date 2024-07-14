// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract DeployNFT is Script {
    function run() external {
        // Load environment variables
        uint256 privateKey = vm.envUint("PK1");

        // Start broadcasting transactions with the loaded private key
        vm.startBroadcast(privateKey);

        // Deploy the NFT contract
        NFT nft = new NFT();

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}