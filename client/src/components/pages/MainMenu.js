import React from "react";
import "../../utilities.css";
import "./MainMenu.css";
import { useNavigate } from "react-router-dom";
import data from "../../yoji.json";

const MainMenu = (props) => {
  let navigate = useNavigate();
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const checkDifficulty = (entry) => {
    let lvl = entry["Kanji Level"];
    if (lvl == "小学生") return 0;
    else if (lvl == "５級") return 1;
    else if (lvl == "４級") return 2;
    else if (lvl == "３級") return 3;
    else if (lvl == "２級") return 4;
    else if (lvl == "１級") return 5;
    else if (lvl == "準２級") return 4;
    else if (lvl == "準１級") return 5;
    else if (lvl == "N/A") return 5;
    else return -1;
  };

  const initializeGame = (numRows, numCols, dif, lives, hints) => {
    //var csv = require("csvtojson");
    //console.log(data.length);
    //console.log("Difficulty = " + dif);
    let result = data.filter((entry) => checkDifficulty(entry) == dif);
    //console.log(result);
    //console.log("Number of entries = " + result.length);
    shuffleArray(result);
    let kanjiCount = Math.round((numRows * numCols) / 4);
    let jsonList = [];
    let kanjiList = [];
    let buttonStates = [];
    //console.log(result[0]["Word"][1]);
    let wordList = [];
    let rawKanjiList = [];
    for (let i = 0; i < kanjiCount; i++) {
      jsonList.push(result[i]);
      wordList.push(result[i]["Word"]);
      for (let j = 0; j < result[i]["Word"].length; j++) {
        rawKanjiList.push(result[i]["Word"][j]);
      }
    }
    shuffleArray(rawKanjiList);
    for (let i = 0; i < numRows; i++) {
      let row = [];
      let staterow = [];
      for (let j = 0; j < numCols; j++) {
        row.push([rawKanjiList[i * numCols + j], i, j]);
        staterow.push(0);
      }
      kanjiList.push(row);
      buttonStates.push(staterow);
    }
    let currentLives = lives;
    let currentHints = hints;
    let blankanswerstate = [];
    for (let i = 0; i < kanjiCount; i++) {
      blankanswerstate.push("????");
    }
    let gamejson = {
      kanjilist: kanjiList,
      wordlist: wordList,
      jsonlist: jsonList,
      buttonstates: buttonStates,
      current: "",
      currentList: [],
      currentWords: [],
      wrongWords: [],
      lives: currentLives,
      hints: currentHints,
      answerState: blankanswerstate,
    };
    //console.log(gamejson);
    props.setGame(gamejson);
    //console.log(kanjiList);
  };

  const handleSubmit = () => {
    //console.log(document.getElementById("settings-size").value);
    let dimensions = document.getElementById("settings-size").value;
    let dif = document.getElementById("settings-difficulty").value;
    let lives = document.getElementById("settings-lives").value;
    let hints = document.getElementById("settings-hints").value;
    const dimArray = dimensions.split("x");
    const numRows = dimArray[0];
    const numCols = dimArray[1];
    props.setRows(numRows);
    props.setCols(numCols);
    props.setDifficulty(dif);

    if (lives == "infinity") {
      props.setLives(-100);
      lives = -100;
    } else {
      props.setLives(parseInt(lives));
    }

    if (hints == "infinity") {
      props.setHints(hints);
      hints = -100;
    } else {
      props.setHints(parseInt(hints));
    }
    //initialize new game
    initializeGame(numRows, numCols, dif, lives, hints);

    navigate("/game");
  };
  return (
    <div className="page">
      <div className="title">四字熟語ゲーム</div>
      <div className="settings">
        <div className="mainmenu-option-text">サイズ:</div>
        <div>
          <select id="settings-size" defaultValue="4x4" className="settings-select">
            <option value="2x4">2x4</option>
            <option value="3x4">3x4</option>
            <option value="4x4">4x4</option>
            <option value="5x4">5x4</option>
            <option value="6x4">6x4</option>
            <option value="6x6">6x6</option>
            <option value="6x8">6x8</option>
            <option value="8x8">8x8</option>
          </select>
        </div>
        <div className="mainmenu-option-text">難易度:</div>
        <div>
          <select id="settings-difficulty" defaultValue="0" className="settings-select">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mainmenu-option-text">残機:</div>
        <div>
          <select id="settings-lives" defaultValue="3" className="settings-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="infinity">∞</option>
          </select>
        </div>
        <div className="mainmenu-option-text">ヒント:</div>
        <div>
          <select id="settings-hints" defaultValue="3" className="settings-select">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="infinity">∞</option>
          </select>
        </div>
      </div>
      <div className="start-button-container">
        <button onClick={handleSubmit} className="start-button">
          ゲームを始める
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
