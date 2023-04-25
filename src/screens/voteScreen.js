import { paint } from "../help/paint";
import { paintResultScreen } from "./resultScreen";

const voteScreen = /*html*/ `

<div>
<p>voting ends in: 30s</p>
<button class="bg-red-400 h-44 w-44 rounded-full" id="redButton"></button>

<button
  class="bg-yellow-400 h-44 w-44 rounded-full"
  id="yellowButton"
></button>

<button
  class="bg-green-400 h-44 w-44 rounded-full"
  id="greenButton"
></button>
</div>`;

export const paintVoteScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(voteScreen, body);

  // add our logic + event listeners
  const redButton = document.querySelector("#redButton");
  redButton.addEventListener("click", () => {
    paintResultScreen();
  });

  const greenButton = document.querySelector("#greenButton");
  greenButton.addEventListener("click", () => {
    paintResultScreen();
  });

  const yellowButton = document.querySelector("#yellowButton");
  yellowButton.addEventListener("click", () => {
    paintResultScreen();
  });
};

//TODO add selected state to each button
//TODO add logic to connect this screen to resultScreen (aka delete the fact htat we just connected clicking a button and bringint he users to the results page)
