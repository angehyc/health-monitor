import { paint } from "../help/paint";
import { paintStartScreen } from "./startScreen";
import { paintTeamConfirmScreen } from "./teamConfirmScreen";

const nameScreen = /*html*/ `
<div>
<div>
  <p>what's your name?</p>
  <input class="border border-black" id="nameInput" type="text" />
  <button class="bg-green-500" id="confirmButton">confirm</button>
</div>

<button id="backButton">back</button>
</div>`;

export const paintNameScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(nameScreen, body);

  // add our logic + event listeners
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", () => {
    paintStartScreen();
  });

  const confirmButton = document.querySelector("#confirmButton");
  confirmButton.addEventListener("click", () => {
    paintTeamConfirmScreen();
  });
};
