// CubeContext.js
import React, { createContext, useContext, useState } from 'react';

const CubeContext = createContext();

// Starting state is a solved cube.
// (Could/should in principle work this out from cubedata.js)
const initialCubeColours =
[ 
  'y', 'b', 'r',
  'y', 'o', 'b',
  'y', 'r', 'g',
  'y', 'g', 'o',
  'w', 'r', 'b',
  'w', 'b', 'o',
  'w', 'g', 'r',
  'w', 'o', 'g'
 ];

// Global State of Cube. All we need is the 24 face colours
export const CubeProvider = ({ children }) => {
  const [cubeColours, setCubeColours] = useState(initialCubeColours);

  const value = {
    cubeColours,
    setCubeColours,
  };

  return <CubeContext.Provider value={value}>{children}</CubeContext.Provider>;
};

export const useCubeContext = () => {
  return useContext(CubeContext);
};
