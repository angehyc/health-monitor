import { paint } from "../help/paint";
import { paintVoteScreen } from "./voteScreen";

const resultScreen = /*html*/ `
<div>
  <button id="nextRoundButton">next round</button>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>
  <div>name</div>

  <div>
    <button class="bg-red-400 h-20 w-20 rounded-full" id="redButton"></button>

    <button
      class="bg-yellow-400 h-20 w-20 rounded-full"
      id="yellowButton"
    ></button>

    <button
      class="bg-green-400 h-20 w-20 rounded-full"
      id="greenButton"
    ></button>
  </div>
</div>

`;

export const paintResultScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(resultScreen, body);

  // add our logic + event listeners
  const nextRoundButton = document.querySelector("#nextRoundButton");
  nextRoundButton.addEventListener("click", () => {
    paintVoteScreen();
  });
};
