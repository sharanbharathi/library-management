import { combineReducers ,createStore } from "redux"
import Reducers from "./Reducers";
import MembersReducers from "./MembersReducers";

const rootReducer = combineReducers({
    Reducers,MembersReducers
})

const store =createStore(rootReducer);

export default store ;