import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import Web3 from "web3";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const clientId = "BCYyxrXqr9GijhnPonyf1loJ48c-IjMDzZtXskSrrrDmTJJ9shzpz32X8d0InuMc4CXkbYKeyR9tNCvuukcQ0-0"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

export function Header() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: privateKeyProvider,
        });

        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected && web3auth.provider) {
          setLoggedIn(true);
          const web3Instance = new Web3(web3auth.provider as any);
          setWeb3(web3Instance);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const web3auth = new Web3Auth({
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider: privateKeyProvider,
      });

      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected && web3authProvider) {
        setLoggedIn(true);
        const web3Instance = new Web3(web3authProvider as any);
        setWeb3(web3Instance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const web3auth = new Web3Auth({
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider: privateKeyProvider,
      });

      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      setWeb3(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const address = await web3.eth.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    console.log(balance);
  };

  return (
    <header className="">
      <div className="flex py-3 w-full shrink-0 items-center px-6 mx-auto ">
        <Link className="flex" to="/">
          <h1 className="text-xl font-medium tracking-tighter sm:text-2xl xl:text-2xl/none pt-1">
            Collab inc
          </h1>
        </Link>
        <nav className="flex flex-1 justify-center pt-1">
          <Link
            className="mx-2 text-md sm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            to="/"
          >
            Home
          </Link>
          <Link
            className="mx-2 text-md sm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            to="/market"
          >
            Creative Space
          </Link>
          <a
            className="mx-2 text-md sm:text-md xl:text-md/none sm:mx-4 md:mx-6 lg:mx-4 xl:mx-8"
            href="https://programmation.developpez.com/tutoriel/comment-devenir-bon-programmeur/?page=intermediaire"
          >
            About
          </a>
        </nav>
        <div className="ml-auto flex items-center">
          {loggedIn ? (
            <div className="flex items-center">
              <button onClick={getUserInfo} className="card">
                Get User Info
              </button>
              <button onClick={getAccounts} className="card">
                Get Accounts
              </button>
              <button onClick={getBalance} className="card">
                Get Balance
              </button>
              <button onClick={logout} className="card">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={login} className="card">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
