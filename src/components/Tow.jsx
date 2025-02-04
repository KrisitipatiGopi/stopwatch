import React, { useState, useEffect } from "react";

const SIZE = 4;
const EMPTY_GRID = Array(SIZE).fill().map(() => Array(SIZE).fill(0));

const getRandomTile = (grid) => {
  let emptyCells = [];
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === 0) emptyCells.push([r, c]);
  }));

  if (emptyCells.length === 0) return grid;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = Math.random() > 0.9 ? 4 : 2;
  return grid;
};

const moveLeft = (grid) => {
  let newGrid = grid.map(row => {
    let newRow = row.filter(v => v);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    return newRow.filter(v => v).concat(Array(SIZE - newRow.length).fill(0));
  });
  return newGrid;
};

const rotateGrid = (grid) => {
  return grid[0].map((_, i) => grid.map(row => row[i])).reverse();
};

const moveGrid = (grid, direction) => {
  let newGrid = [...grid.map(row => [...row])];
  for (let i = 0; i < direction; i++) newGrid = rotateGrid(newGrid);
  newGrid = moveLeft(newGrid);
  for (let i = 0; i < (4 - direction) % 4; i++) newGrid = rotateGrid(newGrid);
  return getRandomTile(newGrid);
};

const Tow = () => {
  const [grid, setGrid] = useState(getRandomTile(getRandomTile([...EMPTY_GRID.map(row => [...row])])));
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    if (gameOver) return;
    let direction = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 }[e.key];
    if (direction !== undefined) {
      setGrid(prev => moveGrid(prev, direction));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>2048</h1>
      {gameOver && <h2>Game Over</h2>}
      <div className="grid">
        {grid.map((row, r) => row.map((cell, c) => (
          <div key={`${r}-${c}`} className={`cell cell-${cell}`}>{cell || ""}</div>
        )))}
      </div>
    </div>
  );
};

export default Tow;
