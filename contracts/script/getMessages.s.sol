// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/forge-std/src/Script.sol";
import "../lib/forge-std/src/console2.sol";
import "../src/OpenAiChatGptVision.sol";

// forge script script/getMessages.s.sol:GetMessages --rpc-url https://devnet.galadriel.com -vvvv --via-ir --legacy
contract GetMessages is Script {
    function run() external {
        // deploy vision contract
        // update oracle contract whitelist so vision contract can call it

        // Get the privKey from the env var testnet values
        uint256 deployerPrivKey = vm.envUint("PK1");

        // Get the vision address
        address visionAddress = vm.envAddress("VISION_ADDRESS");

        // // Tell F to send txs to the BC
        vm.startBroadcast(deployerPrivKey);

        // // Deploy the contract and set deployer as manager address
        OpenAiChatGptVision openAiChatGptVision = OpenAiChatGptVision(visionAddress);

        // Messages up to 4!
        openAiChatGptVision.getMessageHistory(0);

        vm.stopBroadcast();
    }
}
