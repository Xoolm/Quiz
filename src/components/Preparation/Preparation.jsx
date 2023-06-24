import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  shaffleTemplate,
  startGame,
  nextQuestion,
  newQuestion,
} from "../../reduxToolkit/toolkitSlice";

const Preparation = () => {
  const [title, setTitle] = useState("");
  const [variants1, setVariants1] = useState("");
  const [variants2, setVariants2] = useState("");
  const [variants3, setVariants3] = useState("");
  const [variants4, setVariants4] = useState("");
  const [correct, setCorrect] = useState("");

  const StartGame = () => {
    dispatch(shaffleTemplate());
    dispatch(startGame());
    dispatch(nextQuestion());
  };
  const dispatch = useDispatch();
  const newQuestione = () => {
    dispatch(
      newQuestion({
        title: title,
        variants: [variants1, variants2, variants3, variants4],
        correct: Number(correct - 1),
      })
    );
    setTitle("");
    setVariants1("");
    setVariants2("");
    setVariants3("");
    setVariants4("");
    setCorrect("");
  };
  return (
    <>
      <h1 className="PreparationTitle">Заполните все поля</h1>
      <div className="PreparationQuestion">
        <p className="question">Вопрос</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Вопрос"
          type="text"
          value={title}
        ></input>
      </div>
      <div className="PreparationAnswers">
        <p className="titleAnswer">Ответ 1</p>
        <input
          onChange={(e) => setVariants1(e.target.value)}
          placeholder="Ответ 1"
          type="text"
          value={variants1}
        ></input>
        <p className="titleAnswer">Ответ 2</p>
        <input
          onChange={(e) => setVariants2(e.target.value)}
          placeholder="Ответ 2"
          type="text"
          value={variants2}
        ></input>
        <p className="titleAnswer">Ответ 3</p>
        <input
          onChange={(e) => setVariants3(e.target.value)}
          placeholder="Ответ 3"
          type="text"
          value={variants3}
        ></input>
        <p className="titleAnswer">Ответ 4</p>
        <input
          onChange={(e) => setVariants4(e.target.value)}
          placeholder="Ответ 4"
          type="text"
          value={variants4}
        ></input>
        <p className="correctTitle">Номер верного ответа</p>
        <input
          onChange={(e) => setCorrect(e.target.value)}
          placeholder="Правильный ответ"
          type="text"
          value={correct}
        ></input>
      </div>
      <div className="PreparationBtn">
        <button className="addQuestion" onClick={newQuestione}>
          Добавить
        </button>
        <button className="startQuiz" onClick={StartGame}>
          Начать
        </button>
      </div>
    </>
  );
};

export default Preparation;
