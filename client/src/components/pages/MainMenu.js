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
    if (lvl == "５級") return 1;
    else if (lvl == "４級") return 2;
    else if (lvl == "３級") return 3;
    else if (lvl == "２級") return 4;
    else if (lvl == "１級") return 5;
    else if (lvl == "準２級") return 4;
    else if (lvl == "準１級") return 5;
    else if (lvl == "N/A") return 5;
    else return 0;
  };

  const initializeGame = (siz, dif, lives) => {
    //var csv = require("csvtojson");
    //console.log(data.length);
    //console.log("Difficulty = " + dif);
    let result = data.filter((entry) => checkDifficulty(entry) == dif);
    //console.log(result);
    //console.log("Number of entries = " + result.length);
    shuffleArray(result);
    let kanjiCount = Math.round((siz * siz) / 4);
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
    for (let i = 0; i < siz; i++) {
      let row = [];
      let staterow = [];
      for (let j = 0; j < siz; j++) {
        row.push([rawKanjiList[i * siz + j], i, j]);
        staterow.push(0);
      }
      kanjiList.push(row);
      buttonStates.push(staterow);
    }
    let currentLives = lives;
    let gamejson = {
      kanjilist: kanjiList,
      wordlist: wordList,
      jsonlist: jsonList,
      buttonstates: buttonStates,
      current: "",
      currentList: [],
      currentWords: [],
      lives: currentLives,
    };
    console.log(gamejson);
    props.setGame(gamejson);
    //console.log(kanjiList);
  };

  const handleSubmit = () => {
    //console.log(document.getElementById("settings-size").value);
    let siz = document.getElementById("settings-size").value;
    let dif = document.getElementById("settings-difficulty").value;
    let lives = document.getElementById("settings-lives").value;
    props.setSize(siz);
    props.setDifficulty(dif);
    if (lives == "infinity") {
      props.setLives(-100);
      lives = -100;
    } else {
      props.setLives(parseInt(lives));
    }
    //initialize new game
    initializeGame(siz, dif, lives);

    navigate("/game");
  };
  return (
    <div className="settings">
      <h3>Size: </h3>
      <select id="settings-size" defaultValue="4" className="settings-select">
        <option value="4">4x4</option>
        <option value="6">6x6</option>
        <option value="8">8x8</option>
      </select>
      <h3>Difficulty: </h3>
      <select id="settings-difficulty" defaultValue="1" className="settings-select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <h3>Lives: </h3>
      <select id="settings-lives" defaultValue="3" className="settings-select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="infinity">Infinity</option>
      </select>
      <br></br>
      <br></br>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MainMenu;
