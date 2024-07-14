import React from 'react';
import { GradientTexture } from '@react-three/drei';

interface GradientMaterialProps {
  gradient: string;
}

const GradientMaterial: React.FC<GradientMaterialProps> = ({ gradient }) => {
  const parseLinearGradient = (gradientString: string) => {
    const directionMatch = gradientString.match(/to (\w+ \w+|\w+)/);
    const colors = gradientString.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g);
    
    let angle = 0;
    if (directionMatch) {
      const direction = directionMatch[1];
      switch (direction) {
        case 'top':
          angle = Math.PI;
          break;
        case 'bottom':
          angle = 0;
          break;
        case 'left':
          angle = Math.PI / 2;
          break;
        case 'right':
          angle = -Math.PI / 2;
          break;
        case 'top left':
          angle = (3 * Math.PI) / 4;
          break;
        case 'top right':
          angle = -(3 * Math.PI) / 4;
          break;
        case 'bottom left':
          angle = Math.PI / 4;
          break;
        case 'bottom right':
          angle = 7*Math.PI / 4;
          break;
        default:
          angle = 0;
      }
    }
    
    return { colors: colors ? colors : [], angle };
  };

  const { colors, angle } = parseLinearGradient(gradient);

  return (
    <meshBasicMaterial>
      <GradientTexture rotation={angle} stops={[0, 0.2, 0.4, 0.6, 0.8, 1]} colors={colors} size={1024} />
    </meshBasicMaterial>
  );
};

export default GradientMaterial;
