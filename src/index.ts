import reactDom from "react-dom";
import { Application } from "./components/App";

const initialState = {
  numbers: {
    odd: [1, 3, 5, 7, 9],
    even: [2, 4, 6, 8, 10],
  },
};

export type State = typeof initialState;

const root = document.getElementById("react-root");

reactDom.render(Application(), root);
