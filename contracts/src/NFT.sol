// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ReentrancyGuard, Ownable, ERC721URIStorage {
    uint256 private _nftId;
    mapping(uint256 => address) nftToOwner;
    mapping(address => uint256) ownerNftCount;
    mapping(address => uint256[]) userNfts;
    mapping(uint256 => Auction) auctions;

    uint256[] public nftsInAuction;
    Auction[] public nftsAuctionEnded;

    struct Auction {
        uint256 id;
        bool ended;
        address bestAuctionAddress;
        uint256 bestAuctionAmount;
        uint256 auctionEnding;
        address[] auctioners;
        uint256[] amounts;
    }

    constructor() ERC721("Caramel", "CRML") Ownable(msg.sender) {
        _nftId = 0;
    }

    // Mapping to store user addresses
    mapping(address => bool) private storedAddresses;

    // Event to log the storage of a new address
    event NftAddress(address indexed userAddress);

    // Function to store a new user address
    function storeUserAddress(address userAddress) external nonReentrant {
        // Check if the address is already stored
        require(!storedAddresses[userAddress], "Address is already stored");

        // Store the address
        storedAddresses[userAddress] = true;

        // Emit event
        emit NftAddress(userAddress);
    }

    // Function to check if an address is stored
    function isAddressStored(address userAddress) external view returns (bool) {
        return storedAddresses[userAddress];
    }

    function mintNFT(
        address _recipient,
        string memory _tokenURI
    ) external onlyOwner returns (uint256) {
        _mint(_recipient, _nftId);
        _setTokenURI(_nftId, _tokenURI);
        uint256 id = _nftId;
        _nftId++;
        nftToOwner[id] = _recipient;
        ownerNftCount[_recipient]+=1;
        userNfts[_recipient].push(id);
        return id;
    }

    function updateNFT(
        uint256 _id,
        string memory _tokenURI
    ) external {
        _setTokenURI(_id, _tokenURI);
    }

    function startAuction(
        uint256 _id,
        uint256 _price,
        address _seller
    ) external {
        require(
            nftToOwner[_id] == _seller,
            "You are not the owner of this NFT"
        );
        require(
            _indexOf(_id) == nftsInAuction.length,
            "This NFT is already in an auction"
        );

        auctions[_id] = Auction({
            id: _id,
            ended: false,
            bestAuctionAddress: _seller,
            bestAuctionAmount: _price,
            auctionEnding: block.timestamp + 1 days,
            auctioners: new address[](0),
            amounts: new uint256[](0)
        });

        nftsInAuction.push(_id);
        uint256 index = _indexInNfts(_id, _seller);
        uint256[] storage userNftArray = userNfts[_seller];
        userNftArray[index] = userNftArray[userNftArray.length - 1];
        userNftArray.pop();
    }

    function _indexOf(uint256 _id) internal view returns (uint256) {
        for (uint256 index = 0; index < nftsInAuction.length; index++) {
            if (nftsInAuction[index] == _id) return index;
        }
        return nftsInAuction.length;
    }

    function _indexInNfts(
        uint256 _id,
        address _owner
    ) internal view returns (uint256) {
        for (uint256 index = 0; index < userNfts[_owner].length; index++) {
            if (userNfts[_owner][index] == _id) return index;
        }
        return userNfts[_owner].length;
    }

    function _getBet(
        Auction memory _auction,
        address _auctioner
    ) internal pure returns (uint256) {
        for (uint256 i = 0; i < _auction.auctioners.length; i++) {
            if (_auctioner == _auction.auctioners[i]) return i;
        }
        return _auction.auctioners.length;
    }

    function makeOffer(uint256 _id, uint256 _price) payable external {
        Auction storage auction = auctions[_id];
        uint256 currentPrice = 0;
        uint256 index = _getBet(auction, msg.sender);
        if (index != auction.auctioners.length) {
            currentPrice = auction.amounts[index];
        }

        require(block.timestamp <= auction.auctionEnding, "Auction has ended.");
        require(
            _price + currentPrice > auction.bestAuctionAmount,
            "There is already a higher bid."
        );

        // TODO TRANSFER

        if (index != auction.auctioners.length) {
            auction.amounts[index] += _price;
        } else {
            auction.auctioners.push(msg.sender);
            auction.amounts.push(_price);
        }

        // Update the auction
        auction.bestAuctionAddress = msg.sender;
        auction.bestAuctionAmount = _price + currentPrice;
    }

    function endAuction(uint256 _id) internal {
        Auction storage auction = auctions[_id];

        require(block.timestamp >= auction.auctionEnding, "Auction not ended");
        require(!auction.ended, "Auction solved.");

        auction.ended = true;

        if (auction.bestAuctionAddress != ownerOf(_id)) {
            // TODO Transfer
        }

        // Transférer le NFT au gagnant
        nftToOwner[_id] = auction.bestAuctionAddress;
        ownerNftCount[ownerOf(_id)] -= 1;
        ownerNftCount[auction.bestAuctionAddress] += 1;

        userNfts[auction.bestAuctionAddress].push(_id);
        _transfer(ownerOf(_id), auction.bestAuctionAddress, _id);

        uint256 index = _indexOf(_id);
        uint256 i;
        nftsInAuction[index] = nftsInAuction[nftsInAuction.length - 1];
        nftsInAuction.pop();
        nftsAuctionEnded.push(auction);

        for (i = 0; i < auction.auctioners.length; i++) {
            if (auction.auctioners[i] != auction.bestAuctionAddress) {
                // TODO Transfer
            }
        }
    }

    function endAuctions() external {
        Auction storage auction;
        for(uint256 i = 0; i < nftsInAuction.length; i++){
            auction = auctions[nftsInAuction[i]];
            if(auction.auctionEnding <= block.timestamp)endAuction(nftsInAuction[i]);
        }
    }

    // Getters

    function getNftToOwner(uint256 _id) external view returns (address) {
        return nftToOwner[_id];
    }

    function getOwnerNftCount(address _owner) external view returns (uint256) {
        return ownerNftCount[_owner];
    }

    function getUserNfts(
        address _owner
    ) external view returns (uint256[] memory) {
        return userNfts[_owner];
    }

    function getAuction(uint256 _id) external view returns (Auction memory) {
        return auctions[_id];
    }

    function getNftsInAuction() external view returns (uint256[] memory) {
        return nftsInAuction;
    }

    function getNftsAuctionEnded() external view returns (Auction[] memory) {
        return nftsAuctionEnded;
    }
}