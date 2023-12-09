// src/App.js
import React from 'react';
import ThreeDScene from './components/ThreeDScene';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rubiks 2x2 Solver</h1>
      </header>
      <main>
        <ThreeDScene />
      </main>
    </div>
  );
}

export default App;