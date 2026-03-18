import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import GameLibrary from "./components/GameLibrary";
import GamePlayer from "./components/GamePlayer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "games", Component: GameLibrary },
      { path: "play/:gameId", Component: GamePlayer },
    ],
  },
]);
