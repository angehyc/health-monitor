import { paint } from "../help/paint";
import { supabase } from "../main";
import { paintVoteScreen } from "./voteScreen";

const resultScreen = /*html*/ `
<div
  class="w-full h-screen bg-center flex flex-col bg-cover items-center justify-between bg-[url('/smigachu.png')] bg-black text-white pb-20 pt-32"
  >
  <button class="fixed top-10 py-1 px-4 right-10 bg-orange-400 font-comic-sans text-2xl font-bold" id="nextRoundButton">next round</button>
  <div id="teamNames" class="grid grid-cols-2 gap-6 w-full place-items-center px-10">

  </div>

</div>`;

//TODO: add button changing functionality
/* <div>
<button class="bg-red-400 h-20 w-20 rounded-full" id="redButton"></button>

<button
  class="bg-yellow-400 h-20 w-20 rounded-full"
  id="yellowButton"
></button>

<button
  class="bg-green-400 h-20 w-20 rounded-full"
  id="greenButton"
></button>
</div> */

const paintUsersWithVote = async (container) => {
  const result = await supabase.from("users").select("*");
  container.innerHTML = "";
  for (let user of result.data) {
    let userVote;
    if (user.vote === "green") {
      userVote = /*html*/ `<div
      class="bg-green-400 h-8 w-8 rounded-full"
    ></div>`;
    } else if (user.vote === "red") {
      userVote = /*html*/ `<div
      class="bg-red-400 h-8 w-8 rounded-full"
    ></div>`;
    } else if (user.vote === "yellow") {
      userVote = /*html*/ `<div
      class="bg-yellow-400 h-8 w-8 rounded-full"
    ></div>`;
    } else {
      userVote = /*html*/ `<div
      class="bg-gray-300 h-8 w-8 rounded-full"
    ></div>`;
    }
    const newDiv = document.createElement("div");
    newDiv.classList.add("w-full", "flex", "justify-center");
    paint(
      /*html*/ `<div class="bg-white text-black font-times-new-roman italic font-bold px-6 text-3xl py-5 w-full max-w-[500px] items-center flex gap-5">${userVote}${user.username}</div>`,
      newDiv
    );
    container.appendChild(newDiv);
  }
};

export const paintResultScreen = async (userId) => {
  // paint ui
  const body = document.querySelector("body");
  paint(resultScreen, body);
  const teamNames = document.querySelector("#teamNames");

  //DB stuff
  const channel = supabase
    .channel("users")
    .on(
      // listening to when users enter and leave
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
      },
      async (payload) => {
        paintUsersWithVote(teamNames);
      }
    )
    .on(
      // listening for when a new timer starts
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "room",
      },
      async (payload) => {
        const endTime = new Date(payload.new.timer_end);
        channel.unsubscribe();
        paintVoteScreen(userId, endTime);
      }
    )
    .subscribe();

  // add our logic + event listeners
  const nextRoundButton = document.querySelector("#nextRoundButton");
  nextRoundButton.addEventListener("click", () => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + 30000);

    const updateEntry = async () => {
      const { data, error } = await supabase
        .from("room")
        .update({ timer_end: futureTime })
        .match({ room_id: 2 });
    };

    updateEntry();
  });

  paintUsersWithVote(teamNames);
};
