import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import MainMenu from "./pages/MainMenu.js";
import Game from "./pages/Game.js";
import Endgame from "./pages/Endgame.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  //const [userId, setUserId] = useState(undefined);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [difficulty, setDifficulty] = useState(1);
  const [lives, setLives] = useState(3);
  const [game, setGame] = useState(null);
  useEffect(() => {}, []);

  return (
    //<NavBar/>
    <div>
      <Routes>
        <Route
          index
          element={
            <MainMenu
              rows={rows}
              cols={cols}
              difficulty={difficulty}
              lives={lives}
              game={game}
              setRows={setRows}
              setCols={setCols}
              setDifficulty={setDifficulty}
              setLives={setLives}
              setGame={setGame}
            />
          }
        />
        <Route
          path="game"
          element={
            <Game
              rows={rows}
              cols={cols}
              difficulty={difficulty}
              lives={lives}
              game={game}
              setRows={setRows}
              setCols={setCols}
              setDifficulty={setDifficulty}
              setLives={setLives}
              setGame={setGame}
            />
          }
        />
        <Route
          path="result"
          element={
            <Endgame
              rows={rows}
              cols={cols}
              difficulty={difficulty}
              lives={lives}
              game={game}
              setRows={setRows}
              setCols={setCols}
              setDifficulty={setDifficulty}
              setLives={setLives}
              setGame={setGame}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
/*
<Routes>
  <Route path="/" element={<Game path="/" gridSize={4} difficulty={1} lives={3} />} />
  <Route path="*" element={<NotFound />} />
</Routes>
*/
export default App;
