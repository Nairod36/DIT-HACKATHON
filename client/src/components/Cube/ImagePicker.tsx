import { Label } from "@radix-ui/react-label";
import lighthouse from "@lighthouse-web3/sdk";
import { FileIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";

type IProps = {
  updateJSONImg:(uri:string)=>void
}

export const ImagePicker = (props:IProps) => {
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
        undefined,
        progressCallback
      );
      console.log("File uploaded successfully:", output);

      props.updateJSONImg(`https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`)

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
          <Input onChange={handleFileChange} id="file" type="file" placeholder="File" accept="image/*" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} className="w-full" size="lg">
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};
