import {
    ContactShadows,
    Environment,
    Float,
    MeshReflectorMaterial,
    OrbitControls,
    PerspectiveCamera,
    PresentationControls,
    RenderTexture,
    Text,
  } from "@react-three/drei";
  import { Canvas, useLoader } from "@react-three/fiber";
  import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { NearestFilter, Texture, TextureLoader } from "three";
  import ethereumPng from "@/assets/Ethereum.png";
  import padlockPng from "@/assets/padlock.png";
  import { Suspense } from "react";
  
  const context = createContext(null);
  
  const generateRandomCube = (): ICubeFace[] => [
    {
      index: 0,
      available: true,
    },
    {
      index: 1,
      available: true,
    },
    {
      index: 2,
      available: true,
    },
    {
      index: 3,
      available: true,
    },
    {
      index: 4,
      available: true,
    },
    {
      index: 5,
      available: true,
    },
  ];
  
  interface IBox {
    children: JSX.Element[] | JSX.Element;
    rotationIntensity: number;
    editionMode?: boolean;
    setHovered: (value: number | null) => void;
  }
  
  const Box = (props: IBox) => {
    const [hovered, hover] = useState<any>(false);
  
    const cube = useRef<any>();
  
    const handleHover = (event: any) => {
      if (!props.editionMode) return;
      props.setHovered(event.face.materialIndex);
    };
  
    const handleHoverExit = (event: any) => {
      if (!props.editionMode) return;
      props.setHovered(null);
    };
    return (
      <>
        <mesh position-y={0.2}>
          <PresentationControls cursor={false} polar={[Math.PI * -1, Math.PI]}>
            <Float rotationIntensity={props.rotationIntensity} speed={2}>
              <mesh
                ref={cube}
                scale={2.5}
                onPointerMove={handleHover}
                onPointerLeave={handleHoverExit}
              >
                <boxGeometry />
                <context.Provider value={hovered}>
                  {props.children}
                </context.Provider>
              </mesh>
            </Float>
          </PresentationControls>
        </mesh>
      </>
    );
  };
  
  interface IFace {
    children?: JSX.Element[] | JSX.Element | string;
    index: number;
    color?: string;
    map?: any;
    closed?: boolean;
  }
  
  const Face = (props: IFace) => {
    const hovered = useContext(context);
    return (
      <>
        <meshStandardMaterial attach={`material-${props.index}`}>
          <RenderTexture frames={6} attach={"map"} anisotropy={16}>
            <color
              attach="background"
              // args={[`${hovered === props.index ? "hotpink" : props.color}`]}
              args={[`${props.color}`]}
            />
            {props.map ? (
              <EditedFace
                hovered={hovered === props.index}
                closed={props.closed}
                map={props.map}
              />
            ) : (
              <></>
            )}
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} />
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 5]}
            />
            <Text color="black">{props.children}</Text>
          </RenderTexture>
        </meshStandardMaterial>
      </>
    );
  };
  interface IEditedFace {
    map: any;
    hovered: boolean;
    closed?: boolean;
  }
  const EditedFace = (props: IEditedFace) => {
    return (
      <>
        <mesh scale={4.9}>
          <planeGeometry />
          <meshStandardMaterial transparent map={props.map} />
        </mesh>
      </>
    );
  };
  
  export interface ICubeFace {
    index: number;
    closed?: boolean;
    image?: string;
    color?: string;
    available?: boolean;
  }
  export interface ICube {
    faces?: ICubeFace[];
    showIndex?: boolean;
    presentationMode?: boolean;
    editionMode?: boolean;
  }
  
  export const Cube = (props: ICube) => {
    let faces = props.faces ?? generateRandomCube();
    const { filteredFaces, indexMap } = useMemo(() => {
      const filteredFaces = faces.filter((face) => face.image);
      const indexMap = filteredFaces.map((face) => faces.indexOf(face));
      return { filteredFaces, indexMap };
    }, [props.faces]);
  
    const textureList = useLoader(
      TextureLoader,
      filteredFaces.map((face) => face.image as string)
    );
    textureList.forEach((texture) => {
      texture.minFilter = NearestFilter;
    });
  
    const texturesAssoc: { [key: number]: Texture } = useMemo(() => {
      return faces.reduce((acc, face, index) => {
        if (face.image) {
          acc[face.index] = textureList[index];
        }
        return acc;
      }, {} as { [key: number]: Texture });
    }, [props.faces, textureList]);
  
    const [coin, padlock] = useLoader(TextureLoader, [ethereumPng, padlockPng]);
    coin.minFilter = NearestFilter;
    padlock.minFilter = NearestFilter;
    const selectedCoin = coin.clone();
    selectedCoin.repeat.set(0.9, 0.9);
    selectedCoin.offset.set(0.05, 0.05);
  
    const [rotationIntensity, setRotationIntensity] = useState(10);
    const rotationIntensityRef = useRef(rotationIntensity);
    const timeoutRef = useRef<any>();
    const intervalRef = useRef<any>();
  
    const [hovered, setHovered] = useState<number | null>(null);
  
    useEffect(() => {
      rotationIntensityRef.current = rotationIntensity;
    }, [rotationIntensity]);
  
    const increaseRotationIntensity = () => {
      setRotationIntensity((prev) => Math.min(prev + 0.05, 10));
    };
  
    const decreaseRotationIntensity = () => {
      setRotationIntensity((prev) => Math.min(prev - 0.05, 10));
    };
  
    const onHover = () => {
      if (props.presentationMode) return;
      clearTimeout(timeoutRef.current);
      intervalRef.current = setInterval(() => {
        if (rotationIntensityRef.current <= 0) {
          clearInterval(intervalRef.current);
        } else {
          decreaseRotationIntensity();
        }
      }, 10);
    };
  
    const onHoverExit = () => {
      if (props.presentationMode) return;
      clearInterval(intervalRef.current);
      timeoutRef.current = setTimeout(() => {
        const intervalId = setInterval(() => {
          if (rotationIntensityRef.current >= 10) {
            clearInterval(intervalId);
          } else {
            increaseRotationIntensity();
          }
        }, 10);
      }, 1000);
    };
  
    return (
      <>
        <Suspense fallback={<div>Loading Cube...</div>}>
          <Canvas
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [-4, 3, 6],
            }}
            onPointerEnter={onHover}
            onPointerLeave={onHoverExit}
          >
            <OrbitControls enabled={false} />
  
            <Environment preset="city" />
  
            <color args={["#f6f6f7"]} attach={"background"} />
  
            <directionalLight position={[10, 10, 5]} />
            <ambientLight intensity={1.5} />
            <PerspectiveCamera makeDefault position={[0, 5.5, 6]} />
            <Box
              editionMode={props.editionMode}
              rotationIntensity={rotationIntensity}
              setHovered={setHovered}
            >
              {faces.map((face) => (
                <Face
                  key={face.index}
                  closed={face.closed}
                  index={face.index}
                  color={
                    face.color
                      ? face.color
                      : face.available && hovered == face.index
                      ? "grey"
                      : "lightgrey"
                  }
                  map={
                    face.image
                      ? texturesAssoc[face.index]
                      : face.closed
                      ? padlock
                      : face.available
                      ? face.index == hovered
                        ? selectedCoin
                        : coin
                      : ""
                  }
                >
                  {props.showIndex ? `${face.index + 1}` : ""}
                </Face>
              ))}
            </Box>
            <ContactShadows position={[0, -2, 0]} blur={1} opacity={0.1} />
            <ContactShadows
              position={[0, -2, 0]}
              blur={3}
              opacity={0.1}
              color={"grey"}
            />
            <mesh position-y={-2.1} scale={10} rotation-x={-Math.PI * 0.5}>
              <planeGeometry />
              <MeshReflectorMaterial mirror={0.3} resolution={1024} />
            </mesh>
          </Canvas>
        </Suspense>
      </>
    );
  };
  