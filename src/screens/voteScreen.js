import { paint } from "../help/paint";
import { supabase } from "../main";
import { paintResultScreen } from "./resultScreen";

const voteScreen = /*html*/ `

<div
  class="w-full h-screen bg-center flex flex-col items-center justify-between bg-[url('/think.png')] bg-black text-white pb-20 pt-32"
  >
<p class="font-comic-sans text-5xl font-bold">voting ends in: <span id="deltaTime">30</span> s</p>
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

//!JAVASCRIPT___________________________

export const paintVoteScreen = (userId, endTime) => {
  // paint ui
  const body = document.querySelector("body");
  paint(voteScreen, body);

  // add our logic + event listeners

  const nowTime = new Date();
  const startingSeconds = Math.floor((endTime - nowTime) / 1000);
  const deltaTimeElement = document.querySelector("#deltaTime");
  paint(startingSeconds, deltaTimeElement);

  const intervalId = setInterval(async () => {
    const nowTime = new Date();
    const secondsLeft = Math.floor((endTime - nowTime) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(intervalId);
      await supabase
        .from("room")
        .update({ status: "result" })
        .match({ room_id: 2 });
      paintResultScreen(userId);
      return;
    }
    paint(secondsLeft, deltaTimeElement);
  }, 1000);

  const redButton = document.querySelector("#redButton");
  redButton.addEventListener("click", () => {
    redButton.classList.add("inset-border", "inset-0");
    yellowButton.classList.remove("inset-border", "inset-0");
    greenButton.classList.remove("inset-border", "inset-0");
    const updateVote = async () => {
      const { data, error } = await supabase
        .from("users")
        .update({ vote: "red" })
        .match({ user_id: userId });
    };

    updateVote();
  });

  const greenButton = document.querySelector("#greenButton");
  greenButton.addEventListener("click", () => {
    greenButton.classList.add("inset-border", "inset-0");
    redButton.classList.remove("inset-border", "inset-0");
    yellowButton.classList.remove("inset-border", "inset-0");
    const updateVote = async () => {
      const { data, error } = await supabase
        .from("users")
        .update({ vote: "green" })
        .match({ user_id: userId });
    };

    updateVote();
  });

  const yellowButton = document.querySelector("#yellowButton");
  yellowButton.addEventListener("click", () => {
    yellowButton.classList.add("inset-border", "inset-0");
    redButton.classList.remove("inset-border", "inset-0");
    greenButton.classList.remove("inset-border", "inset-0");
    const updateVote = async () => {
      const { data, error } = await supabase
        .from("users")
        .update({ vote: "yellow" })
        .match({ user_id: userId });
    };

    updateVote();
  });
};

//TODO add selected state to each button
//TODO add logic to connect this screen to resultScreen (aka delete the fact htat we just connected clicking a button and bringint he users to the results page)
