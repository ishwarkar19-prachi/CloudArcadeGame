export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  players: string;
  thumbnail: string;
  color: string;
}

export const games: Game[] = [
  {
    id: "snake",
    title: "Snake Classic",
    description: "Guide the snake to eat food and grow longer. Don't hit the walls or yourself!",
    category: "Puzzle",
    difficulty: "Easy",
    players: "1 Player",
    thumbnail: "https://images.unsplash.com/photo-1549507447-2439ff6656a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMGdhbWVzfGVufDF8fHx8MTc2OTA4MDIzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-green-600 to-emerald-600"
  },
  {
    id: "tetris",
    title: "Block Puzzle",
    description: "Stack falling blocks to create complete lines. Clear lines to score points!",
    category: "Puzzle",
    difficulty: "Medium",
    players: "1 Player",
    thumbnail: "https://images.unsplash.com/photo-1638398827627-284082155e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGdhbWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5MTc5NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: "space-shooter",
    title: "Space Invaders",
    description: "Defend Earth from alien invaders! Shoot them down before they reach you.",
    category: "Action",
    difficulty: "Medium",
    players: "1 Player",
    thumbnail: "https://images.unsplash.com/photo-1751759195549-453a9103e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhcmNhZGUlMjBuZW9ufGVufDF8fHx8MTc2OTE3OTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "breakout",
    title: "Breakout",
    description: "Bounce the ball to break all the bricks. Don't let the ball fall!",
    category: "Action",
    difficulty: "Easy",
    players: "1 Player",
    thumbnail: "https://images.unsplash.com/photo-1549507447-2439ff6656a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMGdhbWVzfGVufDF8fHx8MTc2OTA4MDIzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-orange-600 to-red-600"
  },
  {
    id: "pong",
    title: "Pong Classic",
    description: "The classic paddle game. Hit the ball past your opponent to score!",
    category: "Sports",
    difficulty: "Easy",
    players: "1-2 Players",
    thumbnail: "https://images.unsplash.com/photo-1638398827627-284082155e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGdhbWluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5MTc5NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "asteroids",
    title: "Asteroids",
    description: "Navigate your spaceship and destroy asteroids. Watch out for flying debris!",
    category: "Action",
    difficulty: "Hard",
    players: "1 Player",
    thumbnail: "https://images.unsplash.com/photo-1751759195549-453a9103e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhcmNhZGUlMjBuZW9ufGVufDF8fHx8MTc2OTE3OTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-slate-600 to-gray-600"
  }
];
