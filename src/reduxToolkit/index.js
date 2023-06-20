import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quiz from "./toolkitSlice";

const rootReducer = combineReducers({
  toolkit: quiz,
});

export const store = configureStore({
  reducer: rootReducer,
});
