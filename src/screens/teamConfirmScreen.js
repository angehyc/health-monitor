import { paint } from "../help/paint";
import { paintNameScreen } from "./nameScreen";
import { paintVoteScreen } from "./voteScreen";

const teamConfirmScreen = /*html*/ `
<div>
<button id="backButton">back</button>
<div id="teamNames">
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
</div>
<div>
  is the whole team here?
  <button id="yesButton">yes</button>
  <button id="noButton">no</button>
</div>
</div>
`;

export const paintTeamConfirmScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(teamConfirmScreen, body);

  // add our logic + event listeners
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", () => {
    paintNameScreen();
  });

  const yesButton = document.querySelector("#yesButton");
  yesButton.addEventListener("click", () => {
    paintVoteScreen();
  });
};
