import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gridSize = 20;
  const tileCount = 20;

  const snake = useRef<Position[]>([{ x: 10, y: 10 }]);
  const direction = useRef<Position>({ x: 0, y: 0 });
  const food = useRef<Position>({ x: 15, y: 15 });

  const generateFood = () => {
    food.current = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  };

  const resetGame = () => {
    snake.current = [{ x: 10, y: 10 }];
    direction.current = { x: 0, y: 0 };
    generateFood();
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction.current.y === 0) {
            direction.current = { x: 0, y: -1 };
          }
          break;
        case "ArrowDown":
          if (direction.current.y === 0) {
            direction.current = { x: 0, y: 1 };
          }
          break;
        case "ArrowLeft":
          if (direction.current.x === 0) {
            direction.current = { x: -1, y: 0 };
          }
          break;
        case "ArrowRight":
          if (direction.current.x === 0) {
            direction.current = { x: 1, y: 0 };
          }
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

      // Move snake
      const head = { ...snake.current[0] };
      head.x += direction.current.x;
      head.y += direction.current.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
      ) {
        setGameOver(true);
        return;
      }

      // Check self collision
      for (let segment of snake.current) {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          return;
        }
      }

      snake.current.unshift(head);

      // Check food collision
      if (head.x === food.current.x && head.y === food.current.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        snake.current.pop();
      }

      // Clear canvas
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "#334155";
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw snake
      snake.current.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#10b981" : "#34d399";
        ctx.fillRect(
          segment.x * gridSize,
          segment.y * gridSize,
          gridSize - 2,
          gridSize - 2
        );
      });

      // Draw food
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(
        food.current.x * gridSize,
        food.current.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    }, 150);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="text-white">Score: {score}</div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={tileCount * gridSize}
          height={tileCount * gridSize}
          className="border-2 border-green-500 rounded-lg"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="text-center text-white">
              <p className="text-xl mb-2">Press arrow keys to start</p>
              <p className="text-sm text-gray-400">Use arrow keys to move</p>
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-gray-400 text-sm text-center max-w-md">
        <p>Use arrow keys to control the snake</p>
        <p>Eat the red food to grow and score points</p>
        <p>Don't hit the walls or yourself!</p>
      </div>
    </div>
  );
}
