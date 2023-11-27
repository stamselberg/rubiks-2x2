export const faceColours = {
  r : [0.9, 0.2, 0.2, 0.7], // Front face: red
  o : [0.9, 0.5, 0.2, 0.7], // Back face: orange
  w : [0.9, 0.9, 0.9, 0.7], // Top face: white
  y : [0.9, 0.9, 0.2, 0.7], // Bottom face: yellow
  b : [0.2, 0.2, 0.9, 0.7], // Right face: blue
  g : [0.2, 0.9, 0.2, 0.7], // Left face: green
  u : [1.0, 1.0, 1.0, 0.1], // Unselected face: grey
  h : [1.0, 1.0, 1.0, 0.4]  // Highlighted face: grey
};

export const toggleColour = (colour) => {
  const colours = {
    'y': 'r',
    'r': 'b',
    'b': 'g',
    'g': 'o',
    'o': 'w',
    'w': 'y',
  };

  return colours[colour] || colour;
};