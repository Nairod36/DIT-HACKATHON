import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NFTContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endAuctions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuction',
    outputs: [
      {
        name: '',
        internalType: 'struct NFT.Auction',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          {
            name: 'bestAuctionAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'bestAuctionAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'auctionEnding', internalType: 'uint256', type: 'uint256' },
          { name: 'auctioners', internalType: 'address[]', type: 'address[]' },
          { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'getNftToOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNftsAuctionEnded',
    outputs: [
      {
        name: '',
        internalType: 'struct NFT.Auction[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'ended', internalType: 'bool', type: 'bool' },
          {
            name: 'bestAuctionAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'bestAuctionAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'auctionEnding', internalType: 'uint256', type: 'uint256' },
          { name: 'auctioners', internalType: 'address[]', type: 'address[]' },
          { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNftsInAuction',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'getOwnerNftCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'getUserNfts',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'isAddressStored',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'makeOffer',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'mintNFT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nftsAuctionEnded',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'ended', internalType: 'bool', type: 'bool' },
      { name: 'bestAuctionAddress', internalType: 'address', type: 'address' },
      { name: 'bestAuctionAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'auctionEnding', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'nftsInAuction',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_seller', internalType: 'address', type: 'address' },
    ],
    name: 'startAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'storeUserAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'updateNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'userAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'NftAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OpenAiChatGptVision
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const openAiChatGptVisionAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'initialOracleAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'message', internalType: 'string', type: 'string' },
      { name: 'runId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMessage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'chatRuns',
    outputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'messagesCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'chatId', internalType: 'uint256', type: 'uint256' }],
    name: 'getMessageHistory',
    outputs: [
      {
        name: '',
        internalType: 'struct IOracle.Message[]',
        type: 'tuple[]',
        components: [
          { name: 'role', internalType: 'string', type: 'string' },
          {
            name: 'content',
            internalType: 'struct IOracle.Content[]',
            type: 'tuple[]',
            components: [
              { name: 'contentType', internalType: 'string', type: 'string' },
              { name: 'value', internalType: 'string', type: 'string' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'runId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'response',
        internalType: 'struct IOracle.OpenAiResponse',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'content', internalType: 'string', type: 'string' },
          { name: 'functionName', internalType: 'string', type: 'string' },
          { name: 'functionArguments', internalType: 'string', type: 'string' },
          { name: 'created', internalType: 'uint64', type: 'uint64' },
          { name: 'model', internalType: 'string', type: 'string' },
          { name: 'systemFingerprint', internalType: 'string', type: 'string' },
          { name: 'object', internalType: 'string', type: 'string' },
          { name: 'completionTokens', internalType: 'uint32', type: 'uint32' },
          { name: 'promptTokens', internalType: 'uint32', type: 'uint32' },
          { name: 'totalTokens', internalType: 'uint32', type: 'uint32' },
        ],
      },
      { name: 'errorMessage', internalType: 'string', type: 'string' },
    ],
    name: 'onOracleOpenAiLlmResponse',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oracleAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newOracleAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setOracleAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'message', internalType: 'string', type: 'string' },
      { name: 'imageUrls', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'startChat',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'chatId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ChatCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOracleAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OracleAddressUpdated',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useReadNftContract = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadNftContractBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadNftContractGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getAuction"`
 */
export const useReadNftContractGetAuction = /*#__PURE__*/ createUseReadContract(
  { abi: nftContractAbi, functionName: 'getAuction' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getNftToOwner"`
 */
export const useReadNftContractGetNftToOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getNftToOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getNftsAuctionEnded"`
 */
export const useReadNftContractGetNftsAuctionEnded =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getNftsAuctionEnded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getNftsInAuction"`
 */
export const useReadNftContractGetNftsInAuction =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getNftsInAuction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getOwnerNftCount"`
 */
export const useReadNftContractGetOwnerNftCount =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getOwnerNftCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"getUserNfts"`
 */
export const useReadNftContractGetUserNfts =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'getUserNfts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"isAddressStored"`
 */
export const useReadNftContractIsAddressStored =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'isAddressStored',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadNftContractIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"name"`
 */
export const useReadNftContractName = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"nftsAuctionEnded"`
 */
export const useReadNftContractNftsAuctionEnded =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'nftsAuctionEnded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"nftsInAuction"`
 */
export const useReadNftContractNftsInAuction =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'nftsInAuction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadNftContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadNftContractOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadNftContractSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadNftContractSymbol = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadNftContractTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: nftContractAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useWriteNftContract = /*#__PURE__*/ createUseWriteContract({
  abi: nftContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteNftContractApprove = /*#__PURE__*/ createUseWriteContract({
  abi: nftContractAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"endAuctions"`
 */
export const useWriteNftContractEndAuctions =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'endAuctions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"makeOffer"`
 */
export const useWriteNftContractMakeOffer =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'makeOffer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"mintNFT"`
 */
export const useWriteNftContractMintNft = /*#__PURE__*/ createUseWriteContract({
  abi: nftContractAbi,
  functionName: 'mintNFT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteNftContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteNftContractSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteNftContractSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"startAuction"`
 */
export const useWriteNftContractStartAuction =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'startAuction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"storeUserAddress"`
 */
export const useWriteNftContractStoreUserAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'storeUserAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteNftContractTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteNftContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"updateNFT"`
 */
export const useWriteNftContractUpdateNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: nftContractAbi,
    functionName: 'updateNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useSimulateNftContract = /*#__PURE__*/ createUseSimulateContract({
  abi: nftContractAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateNftContractApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"endAuctions"`
 */
export const useSimulateNftContractEndAuctions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'endAuctions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"makeOffer"`
 */
export const useSimulateNftContractMakeOffer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'makeOffer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"mintNFT"`
 */
export const useSimulateNftContractMintNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'mintNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateNftContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateNftContractSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateNftContractSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"startAuction"`
 */
export const useSimulateNftContractStartAuction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'startAuction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"storeUserAddress"`
 */
export const useSimulateNftContractStoreUserAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'storeUserAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateNftContractTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateNftContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"updateNFT"`
 */
export const useSimulateNftContractUpdateNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: nftContractAbi,
    functionName: 'updateNFT',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useWatchNftContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: nftContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchNftContractApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchNftContractApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchNftContractBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchNftContractMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"NftAddress"`
 */
export const useWatchNftContractNftAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'NftAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchNftContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchNftContractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__
 */
export const useReadOpenAiChatGptVision = /*#__PURE__*/ createUseReadContract({
  abi: openAiChatGptVisionAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"chatRuns"`
 */
export const useReadOpenAiChatGptVisionChatRuns =
  /*#__PURE__*/ createUseReadContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'chatRuns',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"getMessageHistory"`
 */
export const useReadOpenAiChatGptVisionGetMessageHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'getMessageHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"oracleAddress"`
 */
export const useReadOpenAiChatGptVisionOracleAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'oracleAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__
 */
export const useWriteOpenAiChatGptVision = /*#__PURE__*/ createUseWriteContract(
  { abi: openAiChatGptVisionAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"addMessage"`
 */
export const useWriteOpenAiChatGptVisionAddMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'addMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"onOracleOpenAiLlmResponse"`
 */
export const useWriteOpenAiChatGptVisionOnOracleOpenAiLlmResponse =
  /*#__PURE__*/ createUseWriteContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'onOracleOpenAiLlmResponse',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"setOracleAddress"`
 */
export const useWriteOpenAiChatGptVisionSetOracleAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'setOracleAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"startChat"`
 */
export const useWriteOpenAiChatGptVisionStartChat =
  /*#__PURE__*/ createUseWriteContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'startChat',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__
 */
export const useSimulateOpenAiChatGptVision =
  /*#__PURE__*/ createUseSimulateContract({ abi: openAiChatGptVisionAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"addMessage"`
 */
export const useSimulateOpenAiChatGptVisionAddMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'addMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"onOracleOpenAiLlmResponse"`
 */
export const useSimulateOpenAiChatGptVisionOnOracleOpenAiLlmResponse =
  /*#__PURE__*/ createUseSimulateContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'onOracleOpenAiLlmResponse',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"setOracleAddress"`
 */
export const useSimulateOpenAiChatGptVisionSetOracleAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'setOracleAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `functionName` set to `"startChat"`
 */
export const useSimulateOpenAiChatGptVisionStartChat =
  /*#__PURE__*/ createUseSimulateContract({
    abi: openAiChatGptVisionAbi,
    functionName: 'startChat',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link openAiChatGptVisionAbi}__
 */
export const useWatchOpenAiChatGptVisionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: openAiChatGptVisionAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `eventName` set to `"ChatCreated"`
 */
export const useWatchOpenAiChatGptVisionChatCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: openAiChatGptVisionAbi,
    eventName: 'ChatCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link openAiChatGptVisionAbi}__ and `eventName` set to `"OracleAddressUpdated"`
 */
export const useWatchOpenAiChatGptVisionOracleAddressUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: openAiChatGptVisionAbi,
    eventName: 'OracleAddressUpdated',
  })
