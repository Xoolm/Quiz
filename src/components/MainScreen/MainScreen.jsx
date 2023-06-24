import React from "react";
import { useDispatch } from "react-redux";
import {
  shaffle,
  startGame,
  nextQuestion,
  preparetionGame,
} from "../../reduxToolkit/toolkitSlice";

const MainScreen = () => {
  const dispatch = useDispatch();
  const StartGame = () => {
    dispatch(shaffle());
    dispatch(startGame());
    dispatch(nextQuestion());
  };
  return (
    <div className="mainScreen">
      <div className="mainScreenText">
        <h1>The Quiz Game</h1>
        <p>
          Игра-викторина, которая поможет вам проверить свои знания и узнать
          новые интересные факты. В игре представлены вопросы из разных областей
          знаний, таких как история, география, естествознание, литература и
          многое другое.
        </p>
      </div>
      <div className="mainScreenBtn">
        <div className="btnPlay">
          <button onClick={StartGame}>Базовый шаблон</button>
        </div>
        <div className="btnNewQuestion">
          <button onClick={() => dispatch(preparetionGame())}>
            Cвой шаблон
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
