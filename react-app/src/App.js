// src/App.js
import React from 'react';
import ThreeDScene from './components/ThreeDScene';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React 3D App</h1>
      </header>
      <main>
        <ThreeDScene />
      </main>
    </div>
  );
}

export default App;