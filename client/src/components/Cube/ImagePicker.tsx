import { Label } from "@radix-ui/react-label";
import lighthouse from "@lighthouse-web3/sdk";
import { FileIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { storage } from "@/App";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

type IProps = {
  updateJSONImg: (uri: string) => void;
};

export const ImagePicker = (props: IProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [imgurUrl, setImgurUrl] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState({
    message: "",
    type: "",
  });

  const progressCallback = (progressData: {
    total: number;
    uploaded: number;
  }) => {
    const percentageDone = (progressData.uploaded / progressData.total) * 100;
    setProgress(percentageDone);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImageUpload(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      URL.revokeObjectURL(objectUrl); // Cleanup
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) {
      setConfirmationMessage({
        message: "Please select a file to upload.",
        type: "error",
      });
      return;
    }

    const imageRef = storageRef(storage, `nft/${file.name}`);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImgurUrl(url);
      console.log(url);
      //   props.updateJSONImg(url);
      setConfirmationMessage({
        message: "File uploaded successfully!",
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

  const handleSubmit = async () => {
    if (imageUpload) {
      await handleUpload(imageUpload);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {preview ? (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
            <FileIcon className="w-12 h-12" />
            <span className="text-sm font-medium text-gray-500">
              Drag and drop a file or click to browse
            </span>
            <span className="text-xs text-gray-500">
              PDF, image, video, or audio
            </span>
          </div>
        )}
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input
            onChange={handleFileChange}
            id="file"
            type="file"
            placeholder="File"
            accept="image/*"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};
