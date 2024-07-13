import { useRef, useState } from "react";
import "./Cube.css";
import Box from "./Box";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import gsap from "gsap";
import EditSelector from "./EditSelector";
import { CubeEditor } from "./CubeEditor";

type IProps = {
  id:number
  editable?: boolean;
};

function Cube(props: IProps) {
  const [editMode, setEditMode] = useState(false);
  const meshRef = useRef<Group>(null);
  const [selectedFace, setSelectedFace] = useState<number | null>(null);

  const handleSelectFace = (value: number) => {
    setSelectedFace((prev) => (value == prev ? null : value));
  };

  const faceCamera = (side: number) => {
    if (meshRef.current) {
      const rotation = { x: 0, y: 0, z: 0 };
      switch (side) {
        case 0: // Front
          rotation.y = 0;
          break;
        case 1: // Back
          rotation.y = Math.PI;
          break;
        case 2: // Top
          rotation.x = -Math.PI / 2;
          break;
        case 3: // Bottom
          rotation.x = Math.PI / 2;
          break;
        case 4: // Left
          rotation.y = Math.PI / 2;
          break;
        case 5: // Right
          rotation.y = -Math.PI / 2;
          break;
      }
      gsap.to(meshRef.current.rotation, {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
        duration: 1,
      });
    }
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box
          id={props.id}
          selected={selectedFace}
          selector={handleSelectFace}
          presentation={!editMode}
          meshRef={meshRef}
          position={[0, 0, 0]}
        />
      </Canvas>
      {props.editable && (
        <div className="headingCube">
          <div className="edit">
            <EditSelector setEditMode={handleEditMode} />
          </div>
        </div>
      )}
      {editMode && (
        <>
          {selectedFace && (
            <div className="editionModal">
              <CubeEditor selected={selectedFace} />
            </div>
          )}
          <div className="buttons">
            <div className="buttonsRow">
              <div onClick={() => faceCamera(3)} className="positionButton">
                1
              </div>
            </div>
            <div className="buttonsRow">
              <div onClick={() => faceCamera(4)} className="positionButton">
                2
              </div>
              <div onClick={() => faceCamera(0)} className="positionButton">
                3
              </div>
              <div onClick={() => faceCamera(5)} className="positionButton">
                4
              </div>
            </div>
            <div className="buttonsRow">
              <div onClick={() => faceCamera(2)} className="positionButton">
                5
              </div>
            </div>
            <div className="buttonsRow">
              <div onClick={() => faceCamera(1)} className="positionButton">
                6
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cube;
