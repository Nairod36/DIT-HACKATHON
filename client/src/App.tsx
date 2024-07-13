import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/Home";
import UploadFile from "./pages/UploadFile";

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
          </Routes>
        </main>
      </div>
    </Router>
    </QueryClientProvider>
  );
};

export default App;
