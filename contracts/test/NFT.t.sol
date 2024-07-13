// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    NFT nft;

    event NftAddress(address indexed userAddress);

    function setUp() public {
        nft = new NFT();
    }

    function testStoreUserAddress() public {
        address user1 = address(0x123);
        vm.expectEmit(true, true, true, true);
        emit NftAddress(user1); // Utiliser l'événement du test
        nft.storeUserAddress(user1);
        assertTrue(nft.isAddressStored(user1));
    }

    function testStoreDuplicateAddress() public {
        address user1 = address(0x123);
        nft.storeUserAddress(user1);
        vm.expectRevert("Address is already stored");
        nft.storeUserAddress(user1);
    }

    function testAddressNotStoredInitially() public {
        address user1 = address(0x123);
        assertFalse(nft.isAddressStored(user1));
    }
}