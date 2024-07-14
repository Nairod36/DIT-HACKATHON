import React, { useEffect, useState } from 'react';
import { Euler, Vector3 } from 'three';
import GradientMaterial from './GradientComposant';
import ImageMaterial from './ImageMaterial';

const DEFAULT_COLOR = "#ffa647"
interface IFace {
  id: number;
  parts: IPart[];
}

interface IPart {
  id: number;
  color?: string;
  image?:any
  locked?:boolean
}

type IProps = {
  data: IFace;
  size: number;
  position: Vector3;
  selectedFace: number | null;
  selectFace: (value: number) => void;
  index: number;
  rotation?: Euler;
  editionMode?: boolean;
};

export default function FaceGrid(props: IProps) {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  const getColor = (index: number) => {
    const color = props.data.parts[index].color;
    if(!color)return <meshBasicMaterial key={index} color={DEFAULT_COLOR} />
    if (color.startsWith('linear-gradient')) {
      return <GradientMaterial key={index} gradient={color} />;
    } else {
      return <meshBasicMaterial key={index} color={color} />;
    }
  };

  const getImage = (index: number) => {
    const image = props.data.parts[index].image;
    if (!image) return null;
    return (
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[(1 / props.size) - 0.01, (1 / props.size) - 0.01]} />
        <ImageMaterial imagePath={image} />
      </mesh>
    );
  };

  const handlePointerOver = (index: number) => {
    if (!props.editionMode) return;
    setHoveredTile(index);
  };

  const handlePointerOut = () => {
    if (!props.editionMode) return;
    setHoveredTile(null);
  };

  const handleClick = (index: number) => {
    if (!props.editionMode || hoveredTile === null || props.data.parts[index].locked) return;
    props.selectFace(parseInt(`${props.index}${index}`));
  };

  useEffect(() => {
    if (!props.editionMode) setHoveredTile(null);
  }, [props.editionMode]);

  const grid = [];

  for (let i = 0; i < props.size; i++) {
    for (let j = 0; j < props.size; j++) {
      const index = i * props.size + j;
      const y = i - Math.floor(props.size / 2);
      const x = j - Math.floor(props.size / 2);
      grid.push(
        <mesh
          position={[y * (1 / props.size), x * (1 / props.size), 0]}
          key={`${y}-${x}`}
          onPointerOver={() => handlePointerOver(index)}
          onPointerOut={() => handlePointerOut()}
          onClick={() => handleClick(index)}
        >
          <planeGeometry args={[(1 / props.size) - 0.01, (1 / props.size) - 0.01]} />
          {props.data.parts[index].image ? getImage(index) : getColor(index)}
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
