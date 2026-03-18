import { useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 20;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

const COLORS = [
  "#00f0f0", // cyan
  "#f0f000", // yellow
  "#a000f0", // purple
  "#f0a000", // orange
  "#0000f0", // blue
  "#00f000", // green
  "#f00000", // red
];

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const board = useRef<number[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(0))
  );
  const currentPiece = useRef<{
    shape: number[][];
    x: number;
    y: number;
    color: string;
  } | null>(null);

  const createPiece = () => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[shapeIndex],
      x: Math.floor(COLS / 2) - 1,
      y: 0,
      color: COLORS[shapeIndex],
    };
  };

  const collision = (piece: typeof currentPiece.current, offsetX = 0, offsetY = 0) => {
    if (!piece) return true;

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x + offsetX;
          const newY = piece.y + y + offsetY;

          if (
            newX < 0 ||
            newX >= COLS ||
            newY >= ROWS ||
            (newY >= 0 && board.current[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    if (!currentPiece.current) return;

    currentPiece.current.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = currentPiece.current!.y + y;
          const boardX = currentPiece.current!.x + x;
          if (boardY >= 0) {
            board.current[boardY][boardX] = 1;
          }
        }
      });
    });
  };

  const clearLines = () => {
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (board.current[y].every((cell) => cell !== 0)) {
        board.current.splice(y, 1);
        board.current.unshift(Array(COLS).fill(0));
        linesCleared++;
        y++;
      }
    }
    if (linesCleared > 0) {
      setScore((s) => s + linesCleared * 100 * level);
    }
  };

  const rotatePiece = () => {
    if (!currentPiece.current) return;

    const rotated = currentPiece.current.shape[0].map((_, i) =>
      currentPiece.current!.shape.map((row) => row[i]).reverse()
    );

    const original = currentPiece.current.shape;
    currentPiece.current.shape = rotated;

    if (collision(currentPiece.current)) {
      currentPiece.current.shape = original;
    }
  };

  const resetGame = () => {
    board.current = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    currentPiece.current = createPiece();
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (!gameStarted) {
        setGameStarted(true);
        currentPiece.current = createPiece();
      }

      if (!currentPiece.current) return;

      switch (e.key) {
        case "ArrowLeft":
          if (!collision(currentPiece.current, -1, 0)) {
            currentPiece.current.x--;
          }
          break;
        case "ArrowRight":
          if (!collision(currentPiece.current, 1, 0)) {
            currentPiece.current.x++;
          }
          break;
        case "ArrowDown":
          if (!collision(currentPiece.current, 0, 1)) {
            currentPiece.current.y++;
          }
          break;
        case "ArrowUp":
          rotatePiece();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!currentPiece.current) {
        currentPiece.current = createPiece();
      }

      // Move piece down
      if (!collision(currentPiece.current, 0, 1)) {
        currentPiece.current.y++;
      } else {
        mergePiece();
        clearLines();
        currentPiece.current = createPiece();

        if (collision(currentPiece.current)) {
          setGameOver(true);
          return;
        }
      }

      // Clear canvas
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "#334155";
      for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BLOCK_SIZE, 0);
        ctx.lineTo(i * BLOCK_SIZE, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * BLOCK_SIZE);
        ctx.lineTo(canvas.width, i * BLOCK_SIZE);
        ctx.stroke();
      }

      // Draw board
      board.current.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            ctx.fillStyle = "#3b82f6";
            ctx.fillRect(
              x * BLOCK_SIZE,
              y * BLOCK_SIZE,
              BLOCK_SIZE - 1,
              BLOCK_SIZE - 1
            );
          }
        });
      });

      // Draw current piece
      if (currentPiece.current) {
        ctx.fillStyle = currentPiece.current.color;
        currentPiece.current.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              ctx.fillRect(
                (currentPiece.current!.x + x) * BLOCK_SIZE,
                (currentPiece.current!.y + y) * BLOCK_SIZE,
                BLOCK_SIZE - 1,
                BLOCK_SIZE - 1
              );
            }
          });
        });
      }
    }, 500 / level);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, level]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="text-white">
          <div>Score: {score}</div>
          <div>Level: {level}</div>
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={COLS * BLOCK_SIZE}
          height={ROWS * BLOCK_SIZE}
          className="border-2 border-blue-500 rounded-lg"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="text-center text-white">
              <p className="text-xl mb-2">Press any arrow key to start</p>
              <p className="text-sm text-gray-400">
                ← → to move, ↑ to rotate, ↓ to drop faster
              </p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="text-center text-white">
              <p className="text-2xl mb-2">Game Over!</p>
              <p className="text-xl mb-4">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-gray-400 text-sm text-center max-w-md">
        <p>Use arrow keys: ← → to move, ↑ to rotate, ↓ to drop faster</p>
        <p>Complete lines to score points and increase level</p>
      </div>
    </div>
  );
}
