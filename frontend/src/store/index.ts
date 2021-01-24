import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./rootReducer";

const initialState = {};

const middleWare = thunk;

const rootStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(middleWare))
);


export default rootStore;