// src/pages/UploadPage.tsx
import UploadFileCard from "@/components/lighthouse/UploadFileCard";
import React from "react";

const UploadPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UploadFileCard />
    </div>
  );
};

export default UploadPage;
