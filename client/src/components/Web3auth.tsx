import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const clientId =
  "BCYyxrXqr9GijhnPonyf1loJ48c-IjMDzZtXskSrrrDmTJJ9shzpz32X8d0InuMc4CXkbYKeyR9tNCvuukcQ0-0";
// get it from https://dashboard.web3auth.io by creating a Plug n Play project.

const chainConfig = {
    chainNamespace: "eip155",
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: "sapphire_devnet",
  privateKeyProvider: privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    loginConfig: {
      // Google login
      google: {
        verifier: "ditweb3Verifier", // Pass the Verifier name here
        typeOfLogin: "google", // Pass on the login provider of the verifier you've created
        clientId: "791176148142-6mghq84p6b6kmv5p9sbt6nlj4tirfnt9.apps.googleusercontent.com", // Pass on the Google `Client ID` here
      },
    },
  },
});

web3auth.configureAdapter(openloginAdapter);

// Initialize Modal
await web3auth.initModal();

// Login with Google
await web3auth.connect();