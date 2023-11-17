import { combineReducers } from "redux";
import productReducer from "./ProductReducer";

const myReducer = combineReducers(
    {
        Product:productReducer
    }
);

export default myReducer;