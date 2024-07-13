// Filename - App.js

import { FileIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PickerExample } from "./ColorPicker";

export const FileUploader = (props) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgurUrl, setImgurUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageUpload(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Client-ID 987159710769363",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      setImgurUrl(data.data.link);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    if (imageUpload) {
      await uploadFile(imageUpload);
    }
  };

  return (
    <div>
      <Tabs defaultValue="color">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="color">
          <PickerExample pickColor={(newColor) => console.log(newColor)} />
        </TabsContent>
        <TabsContent value="image">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                <FileIcon className="w-12 h-12" />
                <span className="text-sm font-medium text-gray-500">
                  Drag and drop a file or click to browse
                </span>
                <span className="text-xs text-gray-500">
                  PDF, image, video, or audio
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <Label htmlFor="file" className="text-sm font-medium">
                  File
                </Label>
                <Input
                  id="file"
                  type="file"
                  placeholder="File"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Upload
              </Button>
            </CardFooter>
          </Card>
          {imgurUrl && (
            <div className="mt-4">
              <img src={imgurUrl} alt="Uploaded" className="max-w-full" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
