import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface Enemy extends Position {
  width: number;
  height: number;
}

interface Bullet extends Position {
  width: number;
  height: number;
}

export default function SpaceShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const playerRef = useRef({ x: 280, y: 500, width: 40, height: 40 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const keysRef = useRef({ left: false, right: false, space: false });
  const lastShotRef = useRef(0);

  const resetGame = () => {
    playerRef.current = { x: 280, y: 500, width: 40, height: 40 };
    bulletsRef.current = [];
    enemiesRef.current = [];
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const createEnemies = () => {
    const enemies: Enemy[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        enemies.push({
          x: col * 70 + 30,
          y: row * 50 + 30,
          width: 40,
          height: 30,
        });
      }
    }
    return enemies;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
        enemiesRef.current = createEnemies();
      }

      if (e.key === "ArrowLeft") keysRef.current.left = true;
      if (e.key === "ArrowRight") keysRef.current.right = true;
      if (e.key === " ") {
        e.preventDefault();
        keysRef.current.space = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysRef.current.left = false;
      if (e.key === "ArrowRight") keysRef.current.right = false;
      if (e.key === " ") keysRef.current.space = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = Date.now();

      // Move player
      if (keysRef.current.left && playerRef.current.x > 0) {
        playerRef.current.x -= 5;
      }
      if (
        keysRef.current.right &&
        playerRef.current.x < canvas.width - playerRef.current.width
      ) {
        playerRef.current.x += 5;
      }

      // Shoot
      if (keysRef.current.space && now - lastShotRef.current > 250) {
        bulletsRef.current.push({
          x: playerRef.current.x + playerRef.current.width / 2 - 2,
          y: playerRef.current.y,
          width: 4,
          height: 15,
        });
        lastShotRef.current = now;
      }

      // Move bullets
      bulletsRef.current = bulletsRef.current.filter((bullet) => {
        bullet.y -= 8;
        return bullet.y > 0;
      });

      // Check collisions
      bulletsRef.current = bulletsRef.current.filter((bullet) => {
        let hit = false;
        enemiesRef.current = enemiesRef.current.filter((enemy) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            setScore((s) => s + 10);
            hit = true;
            return false;
          }
          return true;
        });
        return !hit;
      });

      // Check if enemies reached player
      for (let enemy of enemiesRef.current) {
        if (enemy.y + enemy.height > playerRef.current.y) {
          setGameOver(true);
          return;
        }
      }

      // Win condition
      if (enemiesRef.current.length === 0) {
        enemiesRef.current = createEnemies();
      }

      // Clear canvas
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 50; i++) {
        const x = (i * 123) % canvas.width;
        const y = (i * 456) % canvas.height;
        ctx.fillRect(x, y, 2, 2);
      }

      // Draw player
      ctx.fillStyle = "#10b981";
      ctx.fillRect(
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.width,
        playerRef.current.height
      );
      // Player cannon
      ctx.fillStyle = "#34d399";
      ctx.fillRect(
        playerRef.current.x + playerRef.current.width / 2 - 3,
        playerRef.current.y - 10,
        6,
        10
      );

      // Draw bullets
      ctx.fillStyle = "#fbbf24";
      bulletsRef.current.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Draw enemies
      ctx.fillStyle = "#ef4444";
      enemiesRef.current.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        // Enemy details
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(enemy.x + 5, enemy.y + 5, enemy.width - 10, enemy.height - 10);
        ctx.fillStyle = "#ef4444";
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="text-white">Score: {score}</div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="border-2 border-purple-500 rounded-lg"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="text-center text-white">
              <p className="text-xl mb-2">Press any key to start</p>
              <p className="text-sm text-gray-400">
                Arrow keys to move, Space to shoot
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
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-gray-400 text-sm text-center max-w-md">
        <p>Use arrow keys to move, Space to shoot</p>
        <p>Destroy all enemies before they reach you!</p>
      </div>
    </div>
  );
}
