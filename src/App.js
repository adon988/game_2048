import React from 'react';
import Game from './components/Game';
import './App.css';

/**
 * @function App
 * @description 應用程式的主要組件，負責渲染遊戲。
 * @returns {JSX.Element} 應用程式組件的 JSX 元素。
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>2048</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
