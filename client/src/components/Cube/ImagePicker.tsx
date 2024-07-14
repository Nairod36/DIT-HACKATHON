import { Label } from "@radix-ui/react-label";
import { FileIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { storage } from "@/App";
import { ethers } from "ethers";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { OPENAI } from "@/abi/OpenAI";
import { useEthersSigner } from "@/Ethers";

type IProps = {
  updateJSONImg: (uri: string) => void;
};

const ContractAddress = "0x1C9c1892E3B95b111f419A861dBe2bbddfAcB324";

function getChatId(receipt: any, contract: any) {
  let chatId;
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "ChatCreated") {
        // Second event argument
        chatId = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log);
    }
  }
  return chatId;
}

export const ImagePicker = (props: IProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [imgurUrl, setImgurUrl] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState({
    message: "",
    type: "",
  });
  const signer = useEthersSigner();

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
      const urlData = url as string;
      props.updateJSONImg(urlData);

      setConfirmationMessage({
        message: "File uploaded successfully!",
        type: "success",
      });

      //   const signer = await getUserInfo;
      const contract = new ethers.Contract(ContractAddress, OPENAI, signer);
      console.log("Signer", signer);

      const OpenAICall = await contract.startChat(
        "Is this image an NSFW ? Awnser me TRUE OR FALSE",
        [
          "https://firebasestorage.googleapis.com/v0/b/hackaton-a72b0.appspot.com/o/nft%2FIMG_1405.jpeg?alt=media&token=af0737c1-e6bd-40af-af1f-d56e1964b9f3",
        ]
      );

      const receipt = await OpenAICall.wait();
      console.log("Receipt", receipt);
      const chatId = getChatId(receipt, contract);
      if (chatId) {
        console.log("Chat ID", chatId);
      } else {
        const transactionResponse = await contract.addMessage(
          "Is this image an NSFW ? Awnser me TRUE OR FALSE",
          4
        );
        const receipt2 = await transactionResponse.wait();
        console.log(receipt2);
      }
      console.log("Chat ID", chatId);
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
