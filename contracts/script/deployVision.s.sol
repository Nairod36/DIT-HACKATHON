// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/forge-std/src/Script.sol";
import "../lib/forge-std/src/console2.sol";
import "../src/OpenAiChatGptVision.sol";

// forge script script/deployVision.s.sol:DeployScript --rpc-url https://devnet.galadriel.com -vvvv --optimize --optimizer-runs 200 --via-ir --legacy
contract DeployScript is Script {
    function run() external {
        // deploy vision contract
        // update oracle contract whitelist so vision contract can call it

        // Get the privKey from the env var testnet values
        address deployer = vm.envAddress("PK1_ADDRESS");
        uint256 deployerPrivKey = vm.envUint("PK1");

        // Get the Galadriel oracle contract address
        address oracleAddress = vm.envAddress("GALADRIEL_ORACLE_ADDRESS");

        // // Tell F to send txs to the BC
        vm.startBroadcast(deployerPrivKey);

        // // Deploy the contract and set deployer as manager address
        OpenAiChatGptVision openAiChatGptVision = new OpenAiChatGptVision(oracleAddress);

        // Output the contract address for ease of access!
        console.log("contract address", address(openAiChatGptVision));
        console.log("deployerAddress", deployer);

        vm.stopBroadcast();
    }
}
