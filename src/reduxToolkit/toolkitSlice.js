import { createSlice } from "@reduxjs/toolkit";

const quiz = createSlice({
  name: "quizeStash",
  initialState: {
    correct: 0,
    Prepair: 0,
    result: false,
    myTemplate: false,
    Template: [],
    step: 0,
    indexStash: [],
    nextQuest: {},
    questionBank: [
      {
        title:
          "Сколько дней нужно, чтобы Земля совершила оборот вокруг Солнца?",
        variants: ["366", "365", "180", "30"],
        correct: 1,
      },
      {
        title: "Какой национальный цветок Японии?",
        variants: ["Лилия", "Лотус", "Роза", "Сакура"],
        correct: 3,
      },
      {
        title:
          "В 1952 году президентом какой страны был предложен Альберт Эйнштейн?",
        variants: ["Сша", "Швейцария", "Израиль", "Германия"],
        correct: 2,
      },
      {
        title: "Какое стихийное бедствие измеряется по шкале Рихтера?",
        variants: ["Наводнения", "Торнадо", "Ураган", "Землетрясения"],
        correct: 3,
      },
      {
        title: "Что означает термин ДНК?",
        variants: [
          "Дезоксирибонуклеиновая кислота",
          "Дезоксирибонуклеарная кислота",
          "Дуорибонуклеиновая кислота",
          "Дуоксирибонуклеиновая кислота",
        ],
        correct: 0,
      },
      {
        title: "Как Леди Гага ласково называет своих поклонников?",
        variants: ["Beliebers", "Army", "Little Monsters", "KatyCats"],
        correct: 2,
      },
      {
        title: "Как называется самый маленький океан?",
        variants: [
          "Северный Ледовитый океан",
          "Индийский океан",
          "Тихий океан",
          "Атлантический океан",
        ],
        correct: 0,
      },
      {
        title: "Какая страна имеет аббревиатуру “CH”?",
        variants: ["Китай", "Швейцария", "Куба", "Чили"],
        correct: 1,
      },
      {
        title: "Какой автор написал книги “Игра престолов”?",
        variants: [
          "К. С. Льюис",
          "Джордж Р. Р. Мартин",
          "Дж. Р. Р. Толкиен",
          "Дж. К. Роулинг",
        ],
        correct: 1,
      },
      {
        title: "Какое млекопитающее известно самым мощным укусом в мире?",
        variants: ["Бегемот", "Лев", "Аллигатор", "Крокодил"],
        correct: 0,
      },
    ],
  },
  reducers: {
    newQuestion(state, action) {
      state.Template = [...state.Template, action.payload];
    },
    nextQuestion(state) {
      if (state.myTemplate == true) {
        if (state.Template.length <= 0) {
          alert("Добавьте вопрос(ы)");
          return;
        }
        state.nextQuest = state.Template[state.step];
        state.step++;
        if (state.step >= state.Template.length + 1) {
          state.result = true;
        }
      } else if (state.myTemplate == false) {
        state.nextQuest = state.questionBank[state.step];
        state.step++;
        if (state.step >= state.questionBank.length + 1) {
          state.result = true;
        }
      }
    },
    shaffle(state) {
      const shuffle = (array) => {
        let m = state.questionBank.length,
          t,
          i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      };
      shuffle(state.questionBank);
    },
    shaffleTemplate(state) {
      const shuffle = (array) => {
        let m = state.Template.length,
          t,
          i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      };
      shuffle(state.Template);
    },
    correctVariant(state) {
      state.correct++;
    },
    newGame(state) {
      state.correct = 0;
      state.Prepair = 0;
      state.result = false;
      state.step = 0;
      state.myTemplate = false;
      state.nextQuest = {};
    },
    preparetionGame(state) {
      state.Prepair = 1;
      state.Template = [];
      state.myTemplate = true;
    },
    startGame(state) {
      if (state.myTemplate == true) {
        if (state.Template.length <= 0) {
          return;
        }
      }
      state.Prepair = 2;
    },
    resetGame(state) {
      state.step = 0;
      state.correct = 0;
      state.result = false;
      if (state.myTemplate == false) {
        state.nextQuest = state.questionBank[state.step];
      } else if (state.myTemplate == true) {
        state.nextQuest = state.Template[state.step];
      }
      state.step++;
      if (state.step >= state.questionBank.length + 1) {
        state.result = true;
      }
    },
  },
});
export default quiz.reducer;
export const {
  nextQuestion,
  resetGame,
  startGame,
  newQuestion,
  correctVariant,
  newGame,
  preparetionGame,
  shaffle,
  shaffleTemplate,
} = quiz.actions;
