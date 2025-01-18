import { applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import exampleReducer from "./exampleReducer";


const rootReducer = combineReducers(
  {
    example: exampleReducer
  },
  applyMiddleware(thunk)
);

export default rootReducer;
