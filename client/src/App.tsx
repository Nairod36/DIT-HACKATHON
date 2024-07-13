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

const queryClient = new QueryClient();

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
                    <CubeEdition id={1} />
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
