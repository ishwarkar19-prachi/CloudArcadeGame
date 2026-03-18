import { Link } from "react-router";
import { Play, Star, Users, Trophy } from "lucide-react";
import { games } from "../data/games";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function GameLibrary() {
  const categories = ["All", "Action", "Puzzle", "Sports"];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl text-white mb-4">Game Library</h1>
          <p className="text-xl text-gray-300">
            Choose from our collection of classic arcade games
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-all ${
                category === "All"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all hover:transform hover:scale-105 group"
            >
              {/* Game Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-60`}></div>
                
                {/* Play Button Overlay */}
                <Link
                  to={`/play/${game.id}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
                >
                  <div className="bg-white rounded-full p-4">
                    <Play className="w-8 h-8 text-purple-600" />
                  </div>
                </Link>
              </div>

              {/* Game Info */}
              <div className="p-6">
                <h3 className="text-2xl text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 mb-4">{game.description}</p>

                {/* Game Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
                    <Trophy className="w-4 h-4" />
                    {game.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                    <Users className="w-4 h-4" />
                    {game.players}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-600/20 text-pink-300 rounded-full text-sm">
                    <Star className="w-4 h-4" />
                    {game.category}
                  </span>
                </div>

                {/* Play Button */}
                <Link
                  to={`/play/${game.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${game.color} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all`}
                >
                  <Play className="w-5 h-5" />
                  Play Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl text-purple-400 mb-2">6</div>
            <div className="text-gray-300">Games Available</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl text-pink-400 mb-2">10K+</div>
            <div className="text-gray-300">Active Players</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-4xl text-blue-400 mb-2">100%</div>
            <div className="text-gray-300">Free to Play</div>
          </div>
        </div>
      </div>
    </div>
  );
}
