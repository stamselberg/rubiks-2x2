import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function InfoPanel({ text, font, position }) {
  const texture = useLoader(TextureLoader, createTextCanvas(text, font).toDataURL());

  return (
    <mesh position={[position.x, position.y, 0]} >
      <planeGeometry args={[4, 2]} />
      <meshStandardMaterial map={texture} transparent={true} opacity="1" />
    </mesh>
  );
}


function createTextCanvas(text, font = '48px sans-serif') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = 1024;
  canvas.height = 512;

  // Draw text
  context.font = font;
  context.fillStyle = '#ddf4ff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas;
}
  

export default InfoPanel;
