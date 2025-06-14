import React, { useState, useEffect } from 'react';
import './Game.css';

/**
 * @function Game
 * @description 2048 遊戲組件。
 * @returns {JSX.Element} 遊戲組件的 JSX 元素。
 */
const Game = () => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  /**
   * @function handleTouchStart
   * @description 記錄觸摸開始的座標並防止頁面滾動。
   * @param {TouchEvent} event 觸摸事件。
   */
  const handleTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setTouchStartX(event.touches[0].clientX);
    setTouchStartY(event.touches[0].clientY);
  };

  /**
   * @function handleTouchEnd
   * @description 判斷滑動方向並防止頁面滾動。
   * @param {TouchEvent} event 觸摸事件。
   */
  const handleTouchEnd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30) move('right');
      else if (deltaX < -30) move('left');
    } else {
      if (deltaY > 30) move('down');
      else if (deltaY < -30) move('up');
    }
  };
  const [grid, setGrid] = useState(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  /**
   * @function initializeGrid
   * @description 初始化遊戲網格，隨機生成兩個 2 或 4。
   */
  const initializeGrid = () => {
    // 測試用：固定初始 grid，強制轉型為 number
    let newGrid = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ].map(row => row.map(cell => Number(cell)));
    console.log('initializeGrid 被呼叫:', JSON.stringify(newGrid));
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setTimeout(() => {
      console.log('initializeGrid 設定後 grid 狀態:', JSON.stringify(newGrid));
    }, 100);
  };
/**
   * @function transpose
   * @description 轉置 4x4 矩陣
   * @param {number[][]} matrix
   * @returns {number[][]}
   */
  const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

  /**
   * @function reverseRows
   * @description 將每一 row 反轉
   * @param {number[][]} matrix
   * @returns {number[][]}
   */
  const reverseRows = (matrix) => matrix.map(row => [...row].reverse());

  /**
   * @function isGameOver
   * @description 判斷遊戲是否結束。
   * @param {number[][]} g 當前網格
   * @returns {boolean} 是否結束
   */
  const isGameOver = (g) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (g[i][j] === 0) return false;
        if (i < 3 && g[i][j] === g[i + 1][j]) return false;
        if (j < 3 && g[i][j] === g[i][j + 1]) return false;
      }
    }
    return true;
  };

  /**
   * @function move
   * @description 移動網格中的方塊，並進行合併與分數計算。
   * @param {string} direction 移動方向 (up, down, left, right)。
   */
  /**
   * @function move
   * @description 移動網格中的方塊，並進行合併與分數計算。使用 setGrid callback 以確保取得最新狀態。
   * @param {string} direction 移動方向 (up, down, left, right)。
   */
  const move = (direction) => {
    console.log('move called, direction:', direction, 'current grid:', JSON.stringify(grid));
    setTimeout(() => {
      console.log('move 執行時 grid 狀態:', JSON.stringify(grid));
    }, 100);
    if (gameOver) return;
    let tempScore = 0;
    // 支援所有方向，移除僅 left 限制
    // 使用 setGrid callback 以確保取得最新狀態
    setGrid(prevGrid => {
      console.log('setGrid callback 取得 prevGrid:', JSON.stringify(prevGrid));
      // log 每一列內容
      prevGrid.forEach((row, idx) => {
        console.log(`row[${idx}] before:`, row);
      });
      let newGrid;
      try {
        // 根據方向處理矩陣
        let workingGrid = prevGrid;
        if (direction === 'up') {
          workingGrid = transpose(workingGrid);
        } else if (direction === 'down') {
          workingGrid = transpose(workingGrid);
          workingGrid = reverseRows(workingGrid);
        } else if (direction === 'right') {
          workingGrid = reverseRows(workingGrid);
        }
        // 合併邏輯
        let mergedGrid = workingGrid.map((row, idx) => {
          console.log(`map 前 row[${idx}]:`, row, 'typeof row:', typeof row, 'row.length:', row.length);
          let arr = row.filter(v => v !== 0);
          let merged = [];
          let skip = false;
          for (let i = 0; i < arr.length; i++) {
            if (skip) {
              skip = false;
              continue;
            }
            if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
              merged.push(arr[i] * 2);
              tempScore += arr[i] * 2;
              skip = true;
            } else {
              merged.push(arr[i]);
            }
          }
          while (merged.length < 4) merged.push(0);
          console.log(`row[${idx}] after reduce:`, merged);
          return merged;
        });
        // 還原方向
        if (direction === 'up') {
          mergedGrid = transpose(mergedGrid);
        } else if (direction === 'down') {
          mergedGrid = reverseRows(mergedGrid);
          mergedGrid = transpose(mergedGrid);
        } else if (direction === 'right') {
          mergedGrid = reverseRows(mergedGrid);
        }
        newGrid = mergedGrid;
      } catch (e) {
        console.error('map newGrid 發生錯誤:', e);
        return prevGrid;
      }
      // 判斷是否有移動
      let movedCheck = false;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (prevGrid[i][j] !== newGrid[i][j]) movedCheck = true;
        }
      }
      console.log('grid(before move):', JSON.stringify(prevGrid), 'newGrid(after move):', JSON.stringify(newGrid), 'moved:', movedCheck);
      if (movedCheck) {
        let empty = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newGrid[i][j] === 0) empty.push([i, j]);
          }
        }
        if (empty.length > 0) {
          const [r, c] = empty[Math.floor(Math.random() * empty.length)];
          newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
        setTimeout(() => {
          console.log('setGrid callback 後 grid 狀態:', JSON.stringify(newGrid));
        }, 100);
        // 更新分數與遊戲結束狀態
        setScore(s => s + tempScore);
        if (isGameOver(newGrid)) setGameOver(true);
        return JSON.parse(JSON.stringify(newGrid));
      } else {
        return prevGrid;
      }
    });
  };


  /**
   * @function handleKeyDown
   * @description 處理鍵盤事件，控制方塊移動。
   * @param {KeyboardEvent} event 鍵盤事件。
   */
  const handleKeyDown = (event) => {
    // 驗證鍵盤事件是否觸發
    console.log('keydown:', event.key);
    if (gameOver) return;
    if (event.key === 'ArrowUp') move('up');
    if (event.key === 'ArrowDown') move('down');
    if (event.key === 'ArrowLeft') move('left');
    if (event.key === 'ArrowRight') move('right');
  };

  useEffect(() => {
    initializeGrid();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="game-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="score-board">Score: {score}</div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="cell"
                data-value={cell}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div style={{ marginTop: '20px', color: 'red', fontWeight: 'bold' }}>
          Game Over!<br />
          Score: {score}
          <br />
          <button
            className="restart-btn"
            onClick={(event) => {
              console.log('Restart button clicked');
              event.preventDefault();
              initializeGrid();
            }}
            onTouchStart={(event) => {
              console.log('Restart button touched');
              event.preventDefault();
              initializeGrid();
            }}
          >
            Restart
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Game;
/**
 * @function adjustHeight
 * @description 動態調整 game-container 的高度以排除瀏覽器 UI。
 */
const adjustHeight = () => {
  const gameContainer = document.querySelector('.game-container');
  if (gameContainer) {
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    gameContainer.style.height = `${viewportHeight}px`;
  }
};

window.addEventListener('resize', adjustHeight);
window.addEventListener('load', adjustHeight);