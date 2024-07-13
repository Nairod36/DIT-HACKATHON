import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/common/Header";
import Cube from "./components/Cube/Cube";
import Footer from "./components/footer";
import { Home } from "./pages/Home";
import Market from "./pages/Market";
import NFTDetails from "./pages/NFTDetails";
import UploadFile from "./pages/UploadPage";

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
              <Route path="/cube" element={<Cube editable id={0}/>} />
            </Routes>
          </main>
        <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
