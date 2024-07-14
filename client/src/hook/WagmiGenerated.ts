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
  {
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'isAddressStored',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'userAddress', internalType: 'address', type: 'address' }],
    name: 'storeUserAddress',
    outputs: [],
    stateMutability: 'nonpayable',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link nftContractAbi}__ and `functionName` set to `"isAddressStored"`
 */
export const useReadNftContractIsAddressStored =
  /*#__PURE__*/ createUseReadContract({
    abi: nftContractAbi,
    functionName: 'isAddressStored',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useWriteNftContract = /*#__PURE__*/ createUseWriteContract({
  abi: nftContractAbi,
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useSimulateNftContract = /*#__PURE__*/ createUseSimulateContract({
  abi: nftContractAbi,
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__
 */
export const useWatchNftContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: nftContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link nftContractAbi}__ and `eventName` set to `"NftAddress"`
 */
export const useWatchNftContractNftAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: nftContractAbi,
    eventName: 'NftAddress',
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