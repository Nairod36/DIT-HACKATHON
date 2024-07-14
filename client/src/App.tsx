import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/common/Header";
import Cube from "./components/Cube/Cube";
import Footer from "./components/footer";
import { Home } from "./pages/Home";
import Market from "./pages/Market";
import NFTDetails from "./pages/NFTDetails";
import UploadFile from "./pages/UploadPage";
import { CubeEdition } from "./pages/CubeEdition";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { web3AuthContextConfig } from "./config/web3AuthProviderProps";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, sepolia, polygon } from "wagmi/chains";
import { walletConnect, coinbaseWallet } from "wagmi/connectors";
import Web3AuthConnectorInstance from "./components/Web3AuthConnectorInstance";

const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyCOZj1sPBpj6kEeozoDJIUn8E4NqoW_j_o",
  authDomain: "hackaton-a72b0.firebaseapp.com",
  projectId: "hackaton-a72b0",
  storageBucket: "hackaton-a72b0.appspot.com",
  messagingSenderId: "1043370382086",
  appId: "1:1043370382086:web:cfe0ad4e0ba1fa28abc487",
  measurementId: "G-5KHXEBHGSQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage();
const auth = getAuth();
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Set up client
const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: "3314f39613059cb687432d249f1658d2",
      showQrModal: true,
    }),
    coinbaseWallet({ appName: 'wagmi' }),
    Web3AuthConnectorInstance([mainnet, sepolia, polygon]),
  ],
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
      <Router>
        <div className="App h-screen w-screen">
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <main className="h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadFile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <NFTDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/market"
                element={
                  <ProtectedRoute>
                    <Market />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cube"
                element={
                  <ProtectedRoute>
                    <CubeEdition id={1} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cube/:id"
                element={
                  <ProtectedRoute>
                    <CubeEdition id={0}/>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default App;
