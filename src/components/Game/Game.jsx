import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  shaffle,
  shaffleTemplate,
  resetGame,
  correctVariant,
  newGame,
} from "../../reduxToolkit/toolkitSlice";

const Game = () => {
  const [press, setPress] = useState(false);
  const dispatch = useDispatch();
  const addQuestion = () => {
    dispatch(nextQuestion());
  };
  const question = useSelector((state) => state.toolkit.nextQuest);
  const questionBank = useSelector((state) => state.toolkit.questionBank);
  const step = useSelector((state) => state.toolkit.step);
  const result = useSelector((state) => state.toolkit.result);
  const correct = useSelector((state) => state.toolkit.correct);
  const myTemplate = useSelector((state) => state.toolkit.myTemplate);
  const Template = useSelector((state) => state.toolkit.Template);
  const onClickVariant = (index) => {
    setPress(true);
    setTimeout(() => setPress(false), 500);
    setTimeout(() => addQuestion(), 250);
    if (index === question.correct) {
      dispatch(correctVariant());
    }
  };
  const reset = () => {
    dispatch(shaffle());
    dispatch(resetGame());
  };
  const resetTemaplate = () => {
    dispatch(shaffleTemplate());
    dispatch(resetGame());
  };
  const percentage = Math.round((step / questionBank.length) * 100);
  return (
    <>
      {result === false && (
        <>
          <div className="progress">
            <progress max="100" value={percentage}></progress>
            <div className="progress-bg">
              <div className="progress-bar"></div>
            </div>
          </div>
          <h1 className="quizeTitle">{question.title}</h1>
          <ul className="quize">
            {question.variants.map((text, index) => (
              <li
                className={`variants ${press && "active"}`}
                onClick={() => onClickVariant(index)}
                key={text}
              >
                {text}
              </li>
            ))}
          </ul>
        </>
      )}
      {result === true && (
        <>
          <h1 className="gameTitle">Игра окончена</h1>
          <h2 className="gameCorrect">
            Ваш результат: {correct} из{" "}
            {myTemplate ? [Template.length] : [questionBank.length]}
          </h2>
          <div className="gameBtn">
            <button className="newGame" onClick={() => dispatch(newGame())}>
              Новая Игра
            </button>
            {myTemplate ? (
              <button className="reverse" onClick={resetTemaplate}>
                Повторить
              </button>
            ) : (
              <button className="reverse" onClick={reset}>
                Повторить
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Game;
