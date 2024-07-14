import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { Address } from 'viem'

export default defineConfig({
  out: 'src/hook/WagmiGenerated.ts',
  contracts: [
    {
        name: "NFTContract",
        address: process.env.VITE_NFT_ADDRESS as Address,
        abi: [
          {
              "type": "constructor",
              "inputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "approve",
              "inputs": [
                  {
                      "name": "to",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "balanceOf",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "endAuctions",
              "inputs": [],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "getApproved",
              "inputs": [
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getAuction",
              "inputs": [
                  {
                      "name": "_id",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "tuple",
                      "internalType": "struct NFT.Auction",
                      "components": [
                          {
                              "name": "id",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "ended",
                              "type": "bool",
                              "internalType": "bool"
                          },
                          {
                              "name": "bestAuctionAddress",
                              "type": "address",
                              "internalType": "address"
                          },
                          {
                              "name": "bestAuctionAmount",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "auctionEnding",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "auctioners",
                              "type": "address[]",
                              "internalType": "address[]"
                          },
                          {
                              "name": "amounts",
                              "type": "uint256[]",
                              "internalType": "uint256[]"
                          }
                      ]
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getNftToOwner",
              "inputs": [
                  {
                      "name": "_id",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getNftsAuctionEnded",
              "inputs": [],
              "outputs": [
                  {
                      "name": "",
                      "type": "tuple[]",
                      "internalType": "struct NFT.Auction[]",
                      "components": [
                          {
                              "name": "id",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "ended",
                              "type": "bool",
                              "internalType": "bool"
                          },
                          {
                              "name": "bestAuctionAddress",
                              "type": "address",
                              "internalType": "address"
                          },
                          {
                              "name": "bestAuctionAmount",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "auctionEnding",
                              "type": "uint256",
                              "internalType": "uint256"
                          },
                          {
                              "name": "auctioners",
                              "type": "address[]",
                              "internalType": "address[]"
                          },
                          {
                              "name": "amounts",
                              "type": "uint256[]",
                              "internalType": "uint256[]"
                          }
                      ]
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getNftsInAuction",
              "inputs": [],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getOwnerNftCount",
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "getUserNfts",
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256[]",
                      "internalType": "uint256[]"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "isAddressStored",
              "inputs": [
                  {
                      "name": "userAddress",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "bool",
                      "internalType": "bool"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "isApprovedForAll",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "operator",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "bool",
                      "internalType": "bool"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "makeOffer",
              "inputs": [
                  {
                      "name": "_id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "_price",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [],
              "stateMutability": "payable"
          },
          {
              "type": "function",
              "name": "mintNFT",
              "inputs": [
                  {
                      "name": "_recipient",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "_tokenURI",
                      "type": "string",
                      "internalType": "string"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "name",
              "inputs": [],
              "outputs": [
                  {
                      "name": "",
                      "type": "string",
                      "internalType": "string"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "nftsAuctionEnded",
              "inputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "ended",
                      "type": "bool",
                      "internalType": "bool"
                  },
                  {
                      "name": "bestAuctionAddress",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "bestAuctionAmount",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "auctionEnding",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "nftsInAuction",
              "inputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "owner",
              "inputs": [],
              "outputs": [
                  {
                      "name": "",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "ownerOf",
              "inputs": [
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "renounceOwnership",
              "inputs": [],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "safeTransferFrom",
              "inputs": [
                  {
                      "name": "from",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "to",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "safeTransferFrom",
              "inputs": [
                  {
                      "name": "from",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "to",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "data",
                      "type": "bytes",
                      "internalType": "bytes"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "setApprovalForAll",
              "inputs": [
                  {
                      "name": "operator",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "approved",
                      "type": "bool",
                      "internalType": "bool"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "startAuction",
              "inputs": [
                  {
                      "name": "_id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "_price",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "_seller",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "storeUserAddress",
              "inputs": [
                  {
                      "name": "userAddress",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "supportsInterface",
              "inputs": [
                  {
                      "name": "interfaceId",
                      "type": "bytes4",
                      "internalType": "bytes4"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "bool",
                      "internalType": "bool"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "symbol",
              "inputs": [],
              "outputs": [
                  {
                      "name": "",
                      "type": "string",
                      "internalType": "string"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "tokenURI",
              "inputs": [
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [
                  {
                      "name": "",
                      "type": "string",
                      "internalType": "string"
                  }
              ],
              "stateMutability": "view"
          },
          {
              "type": "function",
              "name": "transferFrom",
              "inputs": [
                  {
                      "name": "from",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "to",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "transferOwnership",
              "inputs": [
                  {
                      "name": "newOwner",
                      "type": "address",
                      "internalType": "address"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "function",
              "name": "updateNFT",
              "inputs": [
                  {
                      "name": "_id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "_tokenURI",
                      "type": "string",
                      "internalType": "string"
                  }
              ],
              "outputs": [],
              "stateMutability": "nonpayable"
          },
          {
              "type": "event",
              "name": "Approval",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "approved",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "indexed": true,
                      "internalType": "uint256"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "ApprovalForAll",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "operator",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "approved",
                      "type": "bool",
                      "indexed": false,
                      "internalType": "bool"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "BatchMetadataUpdate",
              "inputs": [
                  {
                      "name": "_fromTokenId",
                      "type": "uint256",
                      "indexed": false,
                      "internalType": "uint256"
                  },
                  {
                      "name": "_toTokenId",
                      "type": "uint256",
                      "indexed": false,
                      "internalType": "uint256"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "MetadataUpdate",
              "inputs": [
                  {
                      "name": "_tokenId",
                      "type": "uint256",
                      "indexed": false,
                      "internalType": "uint256"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "NftAddress",
              "inputs": [
                  {
                      "name": "userAddress",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "OwnershipTransferred",
              "inputs": [
                  {
                      "name": "previousOwner",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "newOwner",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "event",
              "name": "Transfer",
              "inputs": [
                  {
                      "name": "from",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "to",
                      "type": "address",
                      "indexed": true,
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "indexed": true,
                      "internalType": "uint256"
                  }
              ],
              "anonymous": false
          },
          {
              "type": "error",
              "name": "ERC721IncorrectOwner",
              "inputs": [
                  {
                      "name": "sender",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InsufficientApproval",
              "inputs": [
                  {
                      "name": "operator",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InvalidApprover",
              "inputs": [
                  {
                      "name": "approver",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InvalidOperator",
              "inputs": [
                  {
                      "name": "operator",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InvalidOwner",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InvalidReceiver",
              "inputs": [
                  {
                      "name": "receiver",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721InvalidSender",
              "inputs": [
                  {
                      "name": "sender",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ERC721NonexistentToken",
              "inputs": [
                  {
                      "name": "tokenId",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          },
          {
              "type": "error",
              "name": "OwnableInvalidOwner",
              "inputs": [
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "OwnableUnauthorizedAccount",
              "inputs": [
                  {
                      "name": "account",
                      "type": "address",
                      "internalType": "address"
                  }
              ]
          },
          {
              "type": "error",
              "name": "ReentrancyGuardReentrantCall",
              "inputs": []
          }
      ],
    },
    {
        name: "OpenAiChatGptVision",
        address: process.env.VITE_OPENAI_ADDRESS as Address,
        abi: [
            {
                "type": "constructor",
                "inputs": [
                  {
                    "name": "initialOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  }
                ],
                "stateMutability": "nonpayable"
              },
              {
                "type": "function",
                "name": "addMessage",
                "inputs": [
                  { "name": "message", "type": "string", "internalType": "string" },
                  { "name": "runId", "type": "uint256", "internalType": "uint256" }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
              },
              {
                "type": "function",
                "name": "chatRuns",
                "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                "outputs": [
                  { "name": "owner", "type": "address", "internalType": "address" },
                  {
                    "name": "messagesCount",
                    "type": "uint256",
                    "internalType": "uint256"
                  }
                ],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "getMessageHistory",
                "inputs": [
                  { "name": "chatId", "type": "uint256", "internalType": "uint256" }
                ],
                "outputs": [
                  {
                    "name": "",
                    "type": "tuple[]",
                    "internalType": "struct IOracle.Message[]",
                    "components": [
                      { "name": "role", "type": "string", "internalType": "string" },
                      {
                        "name": "content",
                        "type": "tuple[]",
                        "internalType": "struct IOracle.Content[]",
                        "components": [
                          {
                            "name": "contentType",
                            "type": "string",
                            "internalType": "string"
                          },
                          { "name": "value", "type": "string", "internalType": "string" }
                        ]
                      }
                    ]
                  }
                ],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "onOracleOpenAiLlmResponse",
                "inputs": [
                  { "name": "runId", "type": "uint256", "internalType": "uint256" },
                  {
                    "name": "response",
                    "type": "tuple",
                    "internalType": "struct IOracle.OpenAiResponse",
                    "components": [
                      { "name": "id", "type": "string", "internalType": "string" },
                      { "name": "content", "type": "string", "internalType": "string" },
                      {
                        "name": "functionName",
                        "type": "string",
                        "internalType": "string"
                      },
                      {
                        "name": "functionArguments",
                        "type": "string",
                        "internalType": "string"
                      },
                      { "name": "created", "type": "uint64", "internalType": "uint64" },
                      { "name": "model", "type": "string", "internalType": "string" },
                      {
                        "name": "systemFingerprint",
                        "type": "string",
                        "internalType": "string"
                      },
                      { "name": "object", "type": "string", "internalType": "string" },
                      {
                        "name": "completionTokens",
                        "type": "uint32",
                        "internalType": "uint32"
                      },
                      {
                        "name": "promptTokens",
                        "type": "uint32",
                        "internalType": "uint32"
                      },
                      {
                        "name": "totalTokens",
                        "type": "uint32",
                        "internalType": "uint32"
                      }
                    ]
                  },
                  { "name": "errorMessage", "type": "string", "internalType": "string" }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
              },
              {
                "type": "function",
                "name": "oracleAddress",
                "inputs": [],
                "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
                "stateMutability": "view"
              },
              {
                "type": "function",
                "name": "setOracleAddress",
                "inputs": [
                  {
                    "name": "newOracleAddress",
                    "type": "address",
                    "internalType": "address"
                  }
                ],
                "outputs": [],
                "stateMutability": "nonpayable"
              },
              {
                "type": "function",
                "name": "startChat",
                "inputs": [
                  { "name": "message", "type": "string", "internalType": "string" },
                  { "name": "imageUrls", "type": "string[]", "internalType": "string[]" }
                ],
                "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
                "stateMutability": "nonpayable"
              },
              {
                "type": "event",
                "name": "ChatCreated",
                "inputs": [
                  {
                    "name": "owner",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                  },
                  {
                    "name": "chatId",
                    "type": "uint256",
                    "indexed": true,
                    "internalType": "uint256"
                  }
                ],
                "anonymous": false
              },
              {
                "type": "event",
                "name": "OracleAddressUpdated",
                "inputs": [
                  {
                    "name": "newOracleAddress",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                  }
                ],
                "anonymous": false
              }
        ]
    }
],
plugins: [react()],
})