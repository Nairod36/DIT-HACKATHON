import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface ImageMaterialProps {
  imagePath: string;
}

const ImageMaterial: React.FC<ImageMaterialProps> = ({ imagePath }) => {
  const texture = useLoader(THREE.TextureLoader, imagePath);

  return (
    <meshBasicMaterial map={texture} />
  );
};

export default ImageMaterial;
