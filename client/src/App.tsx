import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Header } from "./components/common/Header";
import Footer from "./components/footer";
import { Home } from "./pages/Home";
import Market from "./pages/Market";
import NFTDetails from "./pages/NFTDetails";
import UploadFile from "./pages/UploadPage";
import { CubeEdition } from "./pages/CubeEdition";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
export const db = getDatabase(app);
export const storage = getStorage();
const auth = getAuth();
export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App h-screen w-screen">
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <main className="h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <UploadFile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <NFTDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/market"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Market />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cube"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CubeEdition />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cube/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CubeEdition />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
