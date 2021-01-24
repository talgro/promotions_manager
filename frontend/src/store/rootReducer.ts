import {combineReducers} from "redux";
import promotionsReducer from "./promotions/reducer";

export const rootReducer = combineReducers({
    promotionsReducer
});

export type RootState = ReturnType<typeof rootReducer>
