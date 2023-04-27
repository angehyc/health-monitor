import { paint } from "../help/paint";
import { supabase } from "../main";
import { paintNameScreen } from "./nameScreen";
import { paintVoteScreen } from "./voteScreen";

const teamConfirmScreen = /*html*/ `
<div
  class="w-full h-screen bg-center flex flex-col items-center justify-between bg-[url('/cat.png')] bg-black text-white pb-20 pt-32"
  >
<button id="backButton" class="fixed top-10 left-10 text-[#fff] italic font-times-new-roman text-3xl" id="backButton">back</button>
<div id="teamNames" class="grid grid-cols-2 gap-6 w-full place-items-center px-10">

</div>
<div class="font-comic-sans text-3xl font-bold bg-[rgb(132,204,22,0.5)] p-5 pr-24">
  <span class="">is the whole team here?</span>
  <button class="text-[#dbff00] bg-[#868686] p-4 mr-2 skew-x-6" id="yesButton">yes</button>
  <button class="text-[#dbff00] bg-[#868686] p-4 absolute" id="noButton">no</button>
</div>
</div>
`;

function moveButton(button) {
  const buttonRect = button.getBoundingClientRect();
  const dx = button.dataset.dx ? parseInt(button.dataset.dx) : 2;
  const dy = button.dataset.dy ? parseInt(button.dataset.dy) : 2;
  let x = button.offsetLeft + dx;
  let y = button.offsetTop + dy;

  if (x < 0 || x + buttonRect.width > window.innerWidth) {
    x -= 2 * dx;
    button.dataset.dx = -dx;
  }

  if (y < 0 || y + buttonRect.height > window.innerHeight) {
    y -= 2 * dy;
    button.dataset.dy = -dy;
  }

  button.style.left = x + "px";
  button.style.top = y + "px";
}

const paintUsers = async (container) => {
  const result = await supabase.from("users").select("*");
  container.innerHTML = "";
  for (let user of result.data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("w-full", "flex", "justify-center");
    paint(
      /*html*/ `<div class="bg-white text-black font-times-new-roman italic font-bold pl-6 text-3xl py-5 w-full max-w-[500px]">${user.username}</div>`,
      newDiv
    );
    container.appendChild(newDiv);
  }
};

export const paintTeamConfirmScreen = async (userId) => {
  // paint ui
  const body = document.querySelector("body");
  paint(teamConfirmScreen, body);
  const teamNames = document.querySelector("#teamNames");

  // display names
  // TODO - on user disconnect (presence), delete user!! - maybe link user id to presence id?
  // subscribing to the DB to listen for changes to users and when someone presses 'yes'
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
        paintUsers(teamNames);
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
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", async () => {
    await supabase.from("users").delete().eq("user_id", userId);
    channel.unsubscribe();
    paintNameScreen();
  });

  const yesButton = document.querySelector("#yesButton");
  yesButton.addEventListener("click", () => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + 30000);

    const updateEntry = async () => {
      const { data, error } = await supabase
        .from("room")
        .update({ timer_end: futureTime })
        .match({ room_id: 2 });

      if (error) console.log("Error updating entry:", error.message);
      else console.log("Entry updated successfully:", data);
    };

    updateEntry();
  });

  const noButton = document.querySelector("#noButton");

  noButton.addEventListener("click", () => {
    noButton.disabled = true;
    noButton.innerHTML = "patience is a virtue";
    noButton.classList.remove("text-[#dbff00]", "bg-[#868686]");
    noButton.classList.add("bg-transparent", "text-[rgba(255,239,0,0.4)]");
    // setTimeout(() => {
    //   noButton.disabled = false;
    //   noButton.innerText = "no";
    //   noButton.classList.add("text-[#dbff00]", "bg-[#868686]");
    //   noButton.classList.remove("bg-transparent", "text-[rgba(255,239,0,0.4)]");
    // }, 2000);
  });

  let animationInterval;

  noButton.addEventListener("click", () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    } else {
      animationInterval = setInterval(() => {
        moveButton(noButton);
      }, 10);
    }
  });

  // show the initial users
  paintUsers(teamNames);
};
