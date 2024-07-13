import React, { useEffect, useRef, useState } from "react";
import {
  Euler,
  Group,
  Object3DEventMap,
  Vector3,
} from "three";
import FaceGrid from "./FaceGrid";
import { Float, PresentationControls } from "@react-three/drei";
import dataExample from "./example.json";

interface BoxProps {
  id: number;
  meshRef: React.RefObject<Group<Object3DEventMap>>;
  position: [number, number, number];
  presentation?: boolean;
  selected: number | null;
  selector: (value: number) => void;
}

const colors = [
  "#00FF00",
  "#FF0000",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

export default function Box(props: BoxProps) {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [cubeData, setCubeData] = useState<typeof dataExample | null>(null)

  useEffect(() => {
    const fetchData = async (id: number) => {
      // TODO fetch from API
      setCubeData(dataExample)
    };
    fetchData(0)
  }, []);

  useEffect(() => {
    setResetKey((prevKey) => prevKey + 1); // Force remount of PresentationControls
  }, [props.presentation]);

  const controlerRef = useRef<any>();

  if(!cubeData)return null

  return (
    <PresentationControls
      key={resetKey}
      enabled={props.presentation} // the controls can be disabled by setting this to false
      global={false} // Spin globally or by dragging the model
      cursor={false} // Whether to toggle cursor style on drag
      snap={false} // Snap-back to center (can also be a spring config)
      speed={1} // Speed factor
      zoom={1} // Zoom factor when half the polar-max is reached
      rotation={[0, 0, 0]} // Default rotation
      polar={[0, Math.PI / 2]} // Vertical limits
      azimuth={[-Infinity, Infinity]} // Horizontal limits
      config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
    >
      <Float
        rotationIntensity={props.presentation ? 20 : 0}
        speed={props.presentation ? 2 : 0}
      >
        <group
          scale={2}
          ref={props.meshRef}
          onClick={() => setActive(!active)}
        >
          <FaceGrid
            data={cubeData.faces[0]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={0}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(0, 0, 0.5)}
            rotation={new Euler(0, 0, 0)}
          />
          <FaceGrid
            data={cubeData.faces[1]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={1}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(0, 0, -0.5)}
            rotation={new Euler(0, Math.PI, 0)}
          />
          <FaceGrid
            data={cubeData.faces[2]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={2}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(0.5, 0, 0)}
            rotation={new Euler(0, Math.PI / 2, 0)}
          />
          <FaceGrid
            data={cubeData.faces[3]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={3}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(-0.5, 0, 0)}
            rotation={new Euler(0, -Math.PI / 2, 0)}
          />
          <FaceGrid
            data={cubeData.faces[4]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={4}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(0, 0.5, 0)}
            rotation={new Euler(-Math.PI / 2, 0, 0)}
          />
          <FaceGrid
            data={cubeData.faces[5]}
            size={cubeData.size}
            selectedFace={props.selected}
            index={5}
            selectFace={props.selector}
            editionMode={!props.presentation}
            position={new Vector3(0, -0.5, 0)}
            rotation={new Euler(Math.PI / 2, 0, 0)}
          />
        </group>
      </Float>
    </PresentationControls>
  );
}
