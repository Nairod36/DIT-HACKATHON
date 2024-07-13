import { FileIcon } from "lucide-react";
import { PickerExample } from "./ColorPicker";
import lighthouse from "@lighthouse-web3/sdk";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImagePicker } from "./ImagePicker";
import dataJSON from "./example.json"

type IProps = {
  selected:number
}

export const CubeEditor = (props:IProps) => {

  const updateJSONImg = async(uri:string) => {
    try{
      const faceId = parseInt(props.selected.toString()[0])
      const caseId = parseInt(props.selected.toString().slice(1))
      dataJSON.faces[faceId].parts[caseId].image = uri
      const output = await lighthouse.uploadText(JSON.stringify(dataJSON),import.meta.env.VITE_LIGHTHOUSE_API_KEY,`${dataJSON.id}.json`)
    }catch(error:any){
      console.error(error)
    }
  }  

  const updateJSONColor = async(color:string) => {
    try{
      const faceId = parseInt(props.selected.toString()[0])
      const caseId = parseInt(props.selected.toString().slice(1))
      dataJSON.faces[faceId].parts[caseId].color = color
      const output = await lighthouse.uploadText(JSON.stringify(dataJSON),import.meta.env.VITE_LIGHTHOUSE_API_KEY,`${dataJSON.id}.json`)
    }catch(error:any){
      console.error(error)
    }
  }

  return (
    <Tabs defaultValue="color">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="color">Color</TabsTrigger>
        <TabsTrigger value="image">Image</TabsTrigger>
      </TabsList>
      <TabsContent value="color">
        <PickerExample updateJSONColor={updateJSONColor} />
      </TabsContent>
      <TabsContent value="image">
        <ImagePicker updateJSONImg={updateJSONImg}/>
      </TabsContent>
    </Tabs>
  );
};
