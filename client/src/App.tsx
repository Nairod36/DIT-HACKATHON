import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Cube from "./components/Cube/Cube";

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
            <Route path="/cube" element={<Cube />} />
          </Routes>
        </main>
      </div>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
