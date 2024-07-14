// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    NFT private nft;
    address private owner = address(0x1);
    address private user1 = address(0x2);
    address private user2 = address(0x3);

    function setUp() public {
        // Assign some ETH to the owner and users
        deal(owner, 10 ether);
        deal(user1, 10 ether);
        deal(user2, 10 ether);

        vm.startPrank(owner);
        nft = new NFT();
        vm.stopPrank();
    }

    function testMintNFT() public {
        vm.startPrank(owner);
        uint256 tokenId = nft.mintNFT(user1, "ipfs://token-uri");
        assertEq(nft.ownerOf(tokenId), user1);
        assertEq(nft.tokenURI(tokenId), "ipfs://token-uri");
        vm.stopPrank();
    }

    function testStartAuction() public {
        vm.startPrank(owner);
        uint256 tokenId = nft.mintNFT(user1, "ipfs://token-uri");
        vm.stopPrank();

        vm.startPrank(user1);
        nft.startAuction(tokenId, 1 ether, user1);
        vm.stopPrank();

        NFT.Auction memory auction = nft.getAuction(tokenId);
        assertEq(auction.id, tokenId);
        assertEq(auction.ended, false);
        assertEq(auction.bestAuctionAddress, user1);
        assertEq(auction.bestAuctionAmount, 1 ether);
    }

    function testMakeOffer() public {
        vm.startPrank(owner);
        uint256 tokenId = nft.mintNFT(user1, "ipfs://token-uri");
        vm.stopPrank();

        vm.startPrank(user1);
        nft.startAuction(tokenId, 1 ether, user1);
        vm.stopPrank();

        vm.startPrank(user2);
        nft.makeOffer{value: 2 ether}(tokenId, 2 ether);
        vm.stopPrank();

        NFT.Auction memory auction = nft.getAuction(tokenId);
        assertEq(auction.bestAuctionAddress, user2);
        assertEq(auction.bestAuctionAmount, 2 ether);
    }

    function testEndAuction() public {
        vm.startPrank(owner);
        uint256 tokenId = nft.mintNFT(user1, "ipfs://token-uri");
        vm.stopPrank();

        vm.startPrank(user1);
        nft.startAuction(tokenId, 1 ether, user1);
        vm.stopPrank();

        vm.startPrank(user2);
        nft.makeOffer{value: 2 ether}(tokenId, 2 ether);
        vm.stopPrank();

        // Fast forward time by 1 day
        vm.warp(block.timestamp + 1 days);

        vm.startPrank(owner);
        nft.endAuctions();
        vm.stopPrank();

        NFT.Auction memory auction = nft.getAuction(tokenId);
        assertEq(auction.ended, true);
        assertEq(nft.ownerOf(tokenId), user2);
    }

    function testStoreUserAddress() public {
        address user1 = address(0x123);
        vm.expectEmit(true, true, true, true);
        // emit NftAddress(user1); // Utiliser l'événement du test
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
