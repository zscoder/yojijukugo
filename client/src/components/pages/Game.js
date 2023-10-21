import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  let navigate = useNavigate();
  useEffect(() => {}, []);
  const handleReset = () => {
    let newjson = JSON.parse(JSON.stringify(props.game));
    for (const idx of props.game.currentList) {
      newjson["buttonstates"][idx[0]][idx[1]] = 0;
    }
    newjson["current"] = "";
    newjson["currentList"] = [];
    props.setGame(newjson);
  };
  const triggerLose = (hp) => {
    navigate("/result");
  };
  const triggerWin = (hp) => {
    navigate("/result");
  };
  const handleClick = (row, col) => {
    return () => {
      //console.log("Triggered at " + row + " " + col);
      let newjson = JSON.parse(JSON.stringify(props.game));
      //console.log(newjson);
      newjson["buttonstates"][row][col] = props.game["current"].length + 1;
      newjson["current"] += props.game["kanjilist"][row][col][0];
      newjson["currentList"].push([row, col]);
      if (newjson["current"].length == 4) {
        //check if props.game.wordlist contains newjson["current"]
        if (props.game["wordlist"].includes(newjson["current"])) {
          for (const idx of newjson["currentList"]) {
            newjson["buttonstates"][idx[0]][idx[1]] = 100;
          }
          newjson["currentWords"].push(newjson["current"]);
          newjson["current"] = "";
          newjson["currentList"] = [];
        } else {
          for (const idx of newjson["currentList"]) {
            newjson["buttonstates"][idx[0]][idx[1]] = 0;
          }
          newjson["lives"] = props.game["lives"] - 1;
          newjson["current"] = "";
          newjson["currentList"] = [];
        }
      }
      props.setGame(newjson);
      //check if game ends
      if (newjson["lives"] >= -5 && newjson["lives"] <= 0) {
        //You lose!
        triggerLose(newjson["lives"]);
      }
      if (newjson["currentWords"].length == Math.round((props.size * props.size) / 4)) {
        //You win!
        triggerWin(newjson["lives"]);
      }
    };
  };
  const showButton = (row, col) => {
    return props.game.buttonstates[row][col] == 0;
  };
  return (
    <div>
      <div>
        <h2>
          Size: {props.size}x{props.size}
        </h2>
      </div>
      <div>
        <h2>Difficulty: {props.difficulty}</h2>
      </div>
      <div>
        {props.lives >= 0 ? (
          <h2>
            Current Lives: {props.game.lives}/{props.lives}
          </h2>
        ) : (
          ""
        )}
      </div>
      <table className="table-container">
        <tbody>
          {props.game.kanjilist.map((kanjirow) => {
            //console.log(kanjirow);
            return (
              <tr>
                {kanjirow.map((kanji) => {
                  return (
                    <td>
                      <button
                        onClick={handleClick(kanji[1], kanji[2])}
                        disabled={!showButton(kanji[1], kanji[2])}
                      >
                        {kanji[0]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
            //return <tr>{kanji}</tr>;
          })}
        </tbody>
      </table>
      <div>Current Phrase: {props.game.current}</div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Found Phrases</td>
            </tr>
          </thead>
          <tbody>
            {props.game.currentWords.map((phrase) => {
              return (
                <tr>
                  <td>{phrase}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Game;
