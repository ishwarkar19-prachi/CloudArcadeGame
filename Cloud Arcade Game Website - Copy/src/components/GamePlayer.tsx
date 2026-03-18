import { useParams, Link } from "react-router";
import { ArrowLeft, Info } from "lucide-react";
import { games } from "../data/games";
import SnakeGame from "./games/SnakeGame";
import TetrisGame from "./games/TetrisGame";
import SpaceShooterGame from "./games/SpaceShooterGame";

export default function GamePlayer() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Game Not Found</h1>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const renderGame = () => {
    switch (gameId) {
      case "snake":
        return <SnakeGame />;
      case "tetris":
        return <TetrisGame />;
      case "space-shooter":
        return <SpaceShooterGame />;
      default:
        return (
          <div className="text-center text-white py-12">
            <p className="text-xl mb-4">This game is coming soon!</p>
            <p className="text-gray-400">
              We're working hard to bring you more awesome games.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>

          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl text-white mb-2">{game.title}</h1>
                <p className="text-gray-400">{game.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                  {game.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                  {game.players}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-600/20 text-pink-300 rounded-full text-sm">
                  {game.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
          <div className="flex justify-center">{renderGame()}</div>
        </div>

        {/* Game Info */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl text-white">About This Game</h3>
          </div>
          <div className="text-gray-400 space-y-2">
            {gameId === "snake" && (
              <>
                <p>
                  Snake is a classic arcade game where you control a growing snake.
                  The goal is to eat as much food as possible without hitting the
                  walls or your own tail.
                </p>
                <p className="text-white">Controls: Use arrow keys to change direction</p>
              </>
            )}
            {gameId === "tetris" && (
              <>
                <p>
                  Tetris is a tile-matching puzzle game. Tetrominoes fall from the
                  top of the screen, and you must rotate and position them to create
                  complete horizontal lines.
                </p>
                <p className="text-white">
                  Controls: Arrow keys to move/rotate, Down arrow to drop faster
                </p>
              </>
            )}
            {gameId === "space-shooter" && (
              <>
                <p>
                  Space Invaders is a classic shoot 'em up game. Defend Earth by
                  shooting down waves of alien invaders before they reach your ship.
                </p>
                <p className="text-white">
                  Controls: Arrow keys to move, Spacebar to shoot
                </p>
              </>
            )}
            {!["snake", "tetris", "space-shooter"].includes(gameId || "") && (
              <p>More details about this game coming soon!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
