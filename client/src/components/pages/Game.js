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
  const handleGiveUp = () => {
    let newjson = JSON.parse(JSON.stringify(props.game));
    newjson["lives"] = 0;
    newjson["current"] = "";
    newjson["currentList"] = [];
    props.setGame(newjson);
    navigate("/result");
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handleHint = () => {
    //console.log("Triggered at " + row + " " + col);
    let newjson = JSON.parse(JSON.stringify(props.game));
    if (newjson["hints"] > 0) {
      //if hints exist
      //make a list of unused indices
      let unusedIndices = [];
      for (let i = 0; i < newjson["answerState"].length; i++) {
        for (let j = 0; j < newjson["answerState"][i].length; j++) {
          if (newjson["answerState"][i][j] == "？") {
            unusedIndices.push([i, j]);
          }
        }
      }
      function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
      }

      if (unusedIndices.length > 0) {
        let id = getRandomInt(0, unusedIndices.length);
        let i = unusedIndices[id][0];
        let j = unusedIndices[id][1];
        newjson["answerState"][i] = setCharAt(
          newjson["answerState"][i],
          j,
          newjson["wordlist"][i][j]
        );
        newjson["hints"]--;
      }
      let curHintCount = props.hintCount;
      props.setGame(newjson);
      props.setHintCount(curHintCount + 1);
    }
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
          let id = props.game["wordlist"].findIndex((element) => element == newjson["current"]);
          newjson["answerState"][id] = newjson["current"];
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
          if (props.lives >= 0) {
            newjson["wrongWords"].push(newjson["current"]);
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
      if (newjson["currentWords"].length == Math.round((props.rows * props.cols) / 4)) {
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
      <div className="settings-display">
        <div>
          <h2>
            サイズ: {props.rows}x{props.cols}
          </h2>
        </div>
        <div>
          <h2>難易度: {props.difficulty}</h2>
        </div>
        <div>
          {props.lives >= 0 ? (
            <h2>
              残機: {props.game.lives}/{props.lives}
            </h2>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.hints > 0 ? (
            <h2>
              ヒント: {props.game.hints}/{props.hints}
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>

      <table className="game-grid">
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

      <div className="current-phrase">Current Phrase: {props.game.current}</div>
      <div className="button-tray">
        <div>
          <button onClick={handleReset}>リセット</button>
        </div>
        <div>
          <button onClick={handleHint}>ヒント</button>
        </div>
        <div>
          <button onClick={handleGiveUp}>諦める</button>
        </div>
      </div>
      <div className="found-list">
        <div>
          <table>
            <thead>
              <tr>
                <td>見つけた四字熟語:</td>
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
        <div>
          {props.hints > 0 ? (
            <table className="hint-table">
              <thead>
                <tr>
                  <td>ヒント:</td>
                </tr>
              </thead>
              <tbody>
                {props.game.answerState.map((phrase) => {
                  return (
                    <tr>
                      <td>{phrase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.game.lives > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>間違ったフレーズ:</td>
                </tr>
              </thead>
              <tbody>
                {props.game.wrongWords.map((phrase) => {
                  return (
                    <tr>
                      <td>{phrase}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
