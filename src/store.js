import { createStore, combineReducers } from "redux";
import persistState from "redux-localstorage";
import session from "./Session/reducer";
import lang from "./Layout/reducer";

const rootReducer = combineReducers({
  session: session,
  lang: lang
});

const enhancer = persistState(rootReducer.place);

const store = createStore(rootReducer, {}, enhancer);

export { store };