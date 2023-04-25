import { paint } from "../help/paint";
import { paintInfoScreen } from "./infoScreen";
import { paintNameScreen } from "./nameScreen";

const startScreen =
  /*html*/
  `<h1>welcome to the TOKENS HEALTH MONITOR</h1>
<button id="start" class="bg-red-500">~start~</button>
<button class="bg-blue-400" id="info">info</button>`;

export const paintStartScreen = () => {
  // paint UI
  const body = document.querySelector("body");
  paint(startScreen, body);

  // add event listeners
  const startButton = document.querySelector("#start");
  const infoButton = document.querySelector("#info");

  startButton.addEventListener("click", () => {
    paintNameScreen();
  });

  infoButton.addEventListener("click", () => {
    paintInfoScreen();
  });
};
