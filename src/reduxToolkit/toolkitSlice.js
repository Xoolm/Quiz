import { createSlice } from "@reduxjs/toolkit";

const quiz = createSlice({
  name: "quizeStash",
  initialState: {
    correct: 0,
    Prepair: true,
    result: false,
    step: 0,
    nextQuest: {},
    questionBank: [],
  },
  reducers: {
    newQuestion(state, action) {
      state.questionBank = [...state.questionBank, action.payload];
    },
    nextQuestion(state) {
      state.nextQuest = state.questionBank[state.step];
      state.step++;
      if (state.step >= state.questionBank.length + 1) {
        state.result = true;
      }
    },
    correctVariant(state) {
      state.correct++;
    },
    newGame(state) {
      state.correct = 0;
      state.Prepair = true;
      state.result = false;
      state.step = 0;
      state.nextQuest = {};
      state.questionBank = [];
    },
    startGame(state) {
      state.Prepair = false;
    },
    resetGame(state) {
      state.step = 0;
      state.correct = 0;
      state.result = false;
      state.nextQuest = state.questionBank[state.step];
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
} = quiz.actions;
