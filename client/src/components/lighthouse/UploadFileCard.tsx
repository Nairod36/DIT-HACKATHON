// src/components/UploadFileCard.tsx
import React, { useState, useEffect } from "react";
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
              // onChange={handleFileChange}
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
        {/* {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-md object-cover"
            />
          </div>
        )} */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className={clsx("h-full bg-blue-500 transition-all duration-300")}
            // style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* {confirmationMessage.message && (
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
        )} */}
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button type="button" onClick={handleUpload}>
          Upload
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default UploadFileCard;
