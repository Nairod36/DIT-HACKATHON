import { FileIcon } from "lucide-react";
import { PickerExample } from "./ColorPicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type IProps = {
  setNewColor:(newColor:string)=>void
}

export const FileUploader = (props:IProps) => {
  return (
    <Tabs defaultValue="color">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>
      <TabsContent value="color">
        <PickerExample pickColor={props.setNewColor} />
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
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">Upload</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
