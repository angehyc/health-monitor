import { paint } from "../help/paint";
import { paintStartScreen } from "./startScreen";

const infoScreen = /*html*/ `
  <div class="bg-slate-500">
    <h1 class="text-white">rules</h1>
    <div class="bg-indigo-700">
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
      <button id="closeButton" class="bg-white">close</button>
    </div>
  </div>
`;

export const paintInfoScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(infoScreen, body);

  // add our logic + event listeners
  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    paintStartScreen();
  });
};
