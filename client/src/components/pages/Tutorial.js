import React from "react";
import "../../utilities.css";
import "./MainMenu.css";
import { useNavigate } from "react-router-dom";
import data from "../../yoji.json";

const Tutorial = (props) => {
  let navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <div className="title">四字熟語ゲーム</div>
      <div className="button-container">
        <button onClick={handleReturn} className="button">
          ホームページに戻る
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
