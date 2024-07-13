import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Home } from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Market from "./pages/Market";
import NFTDetails from "./pages/NFTDetails";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App h-screen w-screen">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadFile />} />
              <Route path="/product/:id" element={<NFTDetails />} />
              <Route path="/market" element={<Market />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
