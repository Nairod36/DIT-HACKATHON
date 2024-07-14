import { Paintbrush } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import VerifyComponent from "./Verify";
import nftAbi from "../../abi/NFT.json"; // Chemin vers votre fichier ABI JSON
import { useAccount, useWriteContract } from "wagmi";
import { useReadNftContractIsAddressStored, useWriteNftContractStoreUserAddress } from "../../hook/WagmiGenerated";

type IPicker = {
  updateJSONColor: (color: string) => void;
};

export function PickerExample(props: IPicker) {

  const { writeContract } = useWriteContract();

  const { address: addressUser, isConnected } = useAccount();
  const nftAddress = process.env.VITE_NFT_ADDRESS;

  useEffect(() => {
    console.log(isConnected, addressUser);
  }, []);

  const isStoredAbi = useReadNftContractIsAddressStored({
    args: [addressUser],
  });
  const { data: isStored } = isStoredAbi;

  const handleStoreAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tx = await writeContract({
      abi: nftAbi,
      address: nftAddress,
      functionName: "storeUserAddress",
      args: [],
    });
  };


  // const provider = useEthersProvider(chainid ? { chainId: parseInt(chainid) } : {});

  // const signer = useEthersSigner();
  // console.log("signer", signer);
  // const contractAddress = process.env.VITE_NFT_ADDRESS;

  // if (!contractAddress) {
  //   throw new Error("Contract address is missing");
  // }

  // const contract = new Contract(contractAddress, abi.abi, signer);

  const [background, setBackground] = useState(
    "linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)"
  );

  const [verification, setVerification] = useState(true);
  const [userAddress, setUserAddress] = useState<string>("");

  const handlePickColor = async () => {
    try {
      // Vérifier si déjà participé (isAddressStored)
      // const isStored = await contract.isAddressStored(userAddress);
      // if (isStored) {
      //   alert("Address is already stored");
      //   return;
      // }

      // Ajouter l'adresse dans la liste des participants (storeUserAddress)
      // const tx = await contract.storeUserAddress(userAddress);
      // await tx.wait();

      props.updateJSONColor(background);
      setVerification(false);
    } catch (error) {
      console.error("Error storing address:", error);
    }
  };

  const resetVerification = () => {
    setVerification(false);
  };

  return (
    <>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div
              className="preview flex h-full min-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
              style={{ background }}
            >
              <GradientPicker
                background={background}
                setBackground={setBackground}
              />
            </div>
          </CardContent>
          <CardFooter>
            {verification ? (
              <VerifyComponent resetVerification={resetVerification} />
            ) : (
              <Button onClick={handlePickColor} className="w-full" size="lg">
                Validate
              </Button>
            )}
          </CardFooter>
        </Card>
    </>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
  ];

  const gradients = [
    "linear-gradient(to bottom right,#accbee,#e7f0fd)",
    "linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to bottom right,#000000,#434343)",
    "linear-gradient(to bottom right,#09203f,#537895)",
    "linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to bottom right,#f953c6,#b91d73)",
    "linear-gradient(to bottom right,#ee0979,#ff6a00)",
    "linear-gradient(to bottom right,#F00000,#DC281E)",
    "linear-gradient(to bottom right,#00c6ff,#0072ff)",
    "linear-gradient(to bottom right,#4facfe,#00f2fe)",
    "linear-gradient(to bottom right,#0ba360,#3cba92)",
    "linear-gradient(to bottom right,#FDFC47,#24FE41)",
    "linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)",
    "linear-gradient(to bottom right,#40E0D0,#FF8C00,#FF0080)",
    "linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
    "linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
  ];

  const images = [
    "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
    "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  ];

  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="mb-2 grid grid-cols-2 gap-1">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all"
      style={{ background }}
    >
      <div className="rounded-md bg-popover/80 p-1 text-center text-xs">
        {children}
      </div>
    </div>
  );
};
