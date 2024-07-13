import { useEffect, useState } from "react";
import { Euler, Vector3 } from "three";

interface IFace {
  id:number
  parts:IPart[]
}

interface IPart {
  id:number
  color:string
}

type IProps = {
  data:IFace
  size:number
  position: Vector3;
  selectedFace:number|null
  selectFace:(value:number)=>void
  index:number;
  rotation?: Euler;
  editionMode?: boolean;
};

export default function FaceGrid(props: IProps) {
  const [hoveredTile, setHoveredTile] = useState<number|null>(null);

  const handlePointerOver = (index: number) => {
    if (!props.editionMode) return;
    setHoveredTile(index);
  };

  const handlePointerOut = () => {
    if (!props.editionMode) return;
    setHoveredTile(null);
  };

  const handleClick = (index:number) => {
    if(!props.editionMode || !hoveredTile)return
    props.selectFace(parseInt(`${props.index}${index}`))
  }

  useEffect(()=>{
    if(!props.editionMode)setHoveredTile(null)
  },[props.editionMode])

  const grid = [];

  for (let i = 0; i < props.size; i++) {
    for (let j = 0; j < props.size; j++) {
      const index = i * props.size + j;
      const y = i - Math.floor(props.size/2)
      const x = j - Math.floor(props.size/2)
      grid.push(
        <mesh
          position={[y * (1/props.size), x * (1/props.size), 0]}
          key={`${y}-${x}`}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={() => handlePointerOut()}
          onClick={()=>handleClick(index)}
        >
          <planeGeometry args={[(1/props.size)-0.01, (1/props.size)-0.01]} />
          <meshBasicMaterial
            color={props.data.parts[index].color}
          />
        </mesh>
      );
    }
  }

  return (
    <group position={props.position} rotation={props.rotation}>
      {grid}
    </group>
  );
}
