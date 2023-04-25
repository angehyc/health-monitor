import { paint } from "../help/paint";
import { supabase } from "../main";
import { paintNameScreen } from "./nameScreen";
import { paintVoteScreen } from "./voteScreen";

const teamConfirmScreen = /*html*/ `
<div>
<button id="backButton">back</button>
<div id="teamNames">

</div>
<div>
  is the whole team here?
  <button id="yesButton">yes</button>
  <button id="noButton">no</button>
</div>
</div>
`;

export const paintTeamConfirmScreen = async (username) => {
  // paint ui
  const body = document.querySelector("body");
  paint(teamConfirmScreen, body);
  const teamNames = document.querySelector("#teamNames");

  // display names
  const channel = supabase
    .channel("users")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
      },
      async (payload) => {
        console.log(payload);

        const result = await supabase.from("users").select("*");
        teamNames.innerHTML = "";
        for (let user of result.data) {
          console.log(user);
          const newDiv = document.createElement("div");
          paint(`${user.username}`, newDiv);
          teamNames.appendChild(newDiv);
        }
      }
    )
    .subscribe();

  // add our logic + event listeners
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", async () => {
    await supabase.from("users").delete().eq("username", username);
    channel.unsubscribe();
    paintNameScreen();
  });

  const yesButton = document.querySelector("#yesButton");
  yesButton.addEventListener("click", () => {
    paintVoteScreen();
  });

  const result = await supabase.from("users").select("*");
  for (let user of result.data) {
    console.log(user);
    const newDiv = document.createElement("div");
    paint(`${user.username}`, newDiv);
    teamNames.appendChild(newDiv);
  }
};
