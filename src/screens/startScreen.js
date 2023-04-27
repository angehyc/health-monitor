import { paint } from "../help/paint";
import { paintInfoScreen } from "./infoScreen";
import { paintNameScreen } from "./nameScreen";

const startScreen =
  /*html*/
  `   <div class="w-full h-screen bg-center bg-cover flex justify-center bg-[url('/IMG_0070.JPG')]">
  <div class="flex flex-col items-center">
        <h1 class="bg-white font-comic-sans text-[40px] px-4 py-2 font-bold mt-10">
          welcome to the TOKENS HEALTH MONITOR
        </h1>
        <button
          id="start"
          class="text-4xl text-[#001AFF] bg-[#06FC3C] font-bold px-8 py-2 mt-[200px] rounded-full transform skew-x-12 animate-rotate ease-in w-fit font-comic-sans"
          //!the padding px and py doesn't work
        >~ST<span class="text-[#a74dd1]">ART</span>~
        </button>
      </div>

      <div class="">
        <button class="bg-blue-400 py-2 px-4 fixed bottom-0 right-0 mb-10 mr-10 bg-[#36E0F8] text-[#FFF] font-comic-sans text-2xl" id="info">info</button>
      </div>
    </div>`;

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
