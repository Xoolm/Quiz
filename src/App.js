import "./scss/main.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  resetGame,
  startGame,
  newQuestion,
  correctVariant,
  newGame,
} from "./reduxToolkit/toolkitSlice";

function App() {
  const prepaire = useSelector((state) => state.toolkit.Prepair);
  return (
    <div className="App">
      <div className="wrapper">
        <div className="quizeBord">
          {prepaire === true && <Preparation />}
          {prepaire === false && <Game />}
        </div>
      </div>
    </div>
  );
}

function Game() {
  const dispatch = useDispatch();
  const addQuestion = () => {
    dispatch(nextQuestion());
  };
  const question = useSelector((state) => state.toolkit.nextQuest);
  const questionBank = useSelector((state) => state.toolkit.questionBank);
  const step = useSelector((state) => state.toolkit.step);
  const result = useSelector((state) => state.toolkit.result);
  const correct = useSelector((state) => state.toolkit.correct);
  console.log(correct);
  console.log(questionBank);
  const onClickVariant = (index) => {
    console.log(step, index);
    addQuestion();
    if (index === question.correct) {
      dispatch(correctVariant());
    }
  };
  const percentage = Math.round((step / questionBank.length) * 100);
  return (
    <>
      {result === false && (
        <>
          <div class="progress">
            <progress max="100" value={percentage}></progress>
            <div class="progress-bg">
              <div class="progress-bar"></div>
            </div>
          </div>
          <h1 className="quizeTitle">{question.title}</h1>
          <ul className="quize">
            {question.variants.map((text, index) => (
              <li
                className="variants"
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
            Вы правильно ответили на [ {correct} ] из [ {questionBank.length} ]
          </h2>
          <div className="gameBtn">
            <button className="newGame" onClick={() => dispatch(newGame())}>
              Новая Игра
            </button>
            <button className="reverse" onClick={() => dispatch(resetGame())}>
              Повторить
            </button>
          </div>
        </>
      )}
    </>
  );
}

function Preparation() {
  const [title, setTitle] = useState("");
  const [variants1, setVariants1] = useState("");
  const [variants2, setVariants2] = useState("");
  const [variants3, setVariants3] = useState("");
  const [variants4, setVariants4] = useState("");
  const [correct, setCorrect] = useState("");

  const StartGame = () => {
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
      <h1 className="PreparationTitle">
        Заполните поля с "Вопросом" и "Вариантами ответа"
      </h1>
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
        <p className="correctTitle">Правильный ответ</p>
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
}

export default App;
