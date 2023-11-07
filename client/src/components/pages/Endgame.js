import { useState } from "react";

import "../../utilities.css";
import "./Endgame.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Endgame = (props) => {
  let navigate = useNavigate();
  useEffect(() => {}, []);

  const handleRetry = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="results-display">
        <div>
          <h2>
            サイズ: {props.rows}x{props.cols}
          </h2>
        </div>
        <div>
          <h2>難易度: {props.difficulty}</h2>
        </div>
        <div>
          <h2>
            スコア: {props.game.currentWords.length}/{Math.round((props.rows * props.cols) / 4)}
          </h2>
        </div>
        <div>
          <h2>ヒント: {props.hintCount}</h2>
        </div>
        <div>
          {props.game.lives > 0 ? (
            <h2>
              残機: {props.game.lives}/{props.lives}
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="game-result">
        <h2>
          あなたが{props.game.lives > 0 || props.game.lives < -10 ? "勝ちました" : "負けました"}!
        </h2>
      </div>

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
      <h2>四字熟語の資料</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>四字熟語</th>
            <th>読み方</th>
            <th>意味</th>
          </tr>
        </thead>
        <tbody>
          {props.game.jsonlist.map((jsonObj) => {
            //console.log(kanjirow);
            return (
              <tr>
                <td>{jsonObj["Word"]}</td>
                <td>{jsonObj["Reading"]}</td>
                <td>{jsonObj["Meaning"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleRetry}>もう一回遊ぶ</button>
    </div>
  );
};

export default Endgame;
