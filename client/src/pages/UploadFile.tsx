// src/components/UploadFile.tsx
import React from "react";
import lighthouse from "@lighthouse-web3/sdk";


const UploadFile: React.FC = () => {
  const progressCallback = (progressData: {
    total: number;
    uploaded: number;
  }) => {
    const percentageDone =
      100 -
      parseFloat((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log(percentageDone);
  };

  const uploadFile = async (file: FileList | null) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(
      file,
      "e871609c.39b6983a7ce14a17b1eb85b8f7c95ee2",
      false,
      undefined,
      progressCallback
    );
    console.log("File Status:", output);

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    <div className="UploadFile">
      <input onChange={(e) => uploadFile(e.target.files)} type="file" />
    </div>
  );
};

export default UploadFile;
