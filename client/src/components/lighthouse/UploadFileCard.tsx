// src/components/UploadFileCard.tsx
import React, { useState, useEffect } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UploadIcon } from "../../icons/Icons";
import { Button } from "../ui/button";
import clsx from "clsx";

const UploadFileCard: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!files) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    // Cleanup the object URL when the component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  const progressCallback = (progressData: {
    total: number;
    uploaded: number;
  }) => {
    const percentageDone = (progressData.uploaded / progressData.total) * 100;
    setProgress(percentageDone);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files || null;
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (!files) {
      setConfirmationMessage({
        message: "Please select a file to upload.",
        type: "error",
      });
      return;
    }

    if (!import.meta.env.VITE_LIGHTHOUSE_API_KEY) {
      console.error("Please set LIGHTHOUSE_API_KEY in .env file");
      return;
    }

    const dealParams = {
      num_copies: 2,
      repair_threshold: 28800,
      renew_threshold: 240,
      miner: ["t017840"],
      network: "calibration",
      deal_duration: 518400,
    };

    try {
      const output = await lighthouse.upload(
        files,
        import.meta.env.VITE_LIGHTHOUSE_API_KEY,
        false,
        dealParams,
        progressCallback
      );
      console.log("File uploaded successfully:", output);

      setConfirmationMessage({
        message: `File uploaded successfully! Visit at https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`,
        type: "success",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setConfirmationMessage({
        message: "Error uploading file. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>
          Drag and drop your image or click to select a file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col items-center justify-center h-48 px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-primary-foreground hover:border-primary cursor-pointer">
            <UploadIcon className="w-8 h-8 mb-1 text-primary-foreground" />
            <input
              onChange={handleFileChange}
              type="file"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <p className="text-sm text-muted-foreground">
                Drop files here or click to upload
              </p>
            </label>
          </div>
        </div>
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-md object-cover"
            />
          </div>
        )}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className={clsx("h-full bg-blue-500 transition-all duration-300")}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {confirmationMessage.message && (
          <div
            className={clsx(
              "mt-4 p-3 text-sm rounded-md",
              confirmationMessage.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {confirmationMessage.message}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" onClick={handleUpload}>
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadFileCard;
