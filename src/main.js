//FREE PASSWORD: J2Rbw3U5wXsb86ZL
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fioyevfhztdmjtblclwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb3lldmZoenRkbWp0YmxjbHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxNjM2MDYsImV4cCI6MTk5NzczOTYwNn0.ixyy-AxrTl7L5_N7ioWO3PhuxykgKovemF7g-TBIARs";
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabase);
// CRUD

// Channel (realtime) supabase.channel("channel_name")
//

//*screen 2
// clear out the HTML (due to the interaction fromt he prv screen)
// add the UI
// put an input that listens for the user typing, and input string length
// when the user types
//   if there is stuff in input, undisable the button
//   else if inputs empty then disable the button
// when user clicks confirm, add the user's input into supabase's DB

//*screen 3
// add UI
// get all the names from DB
// display all the inputted names from supabase's DB
// if there is less

// when user clicks yes
//
// when user clicks no

// on client join, check for all current presences. delete any that  aren't in the DB. (idk put something in each presence)

const body = document.querySelector("body");
const startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
  // body.innerHTML = "";
  // const enterNamePage = document.createElement("div");
  // const innerDiv = document.createElement("div");
  // innerDiv.classList.add("hi");
  // innerDiv.innerText = "hello";
  // enterNamePage.appendChild(innerDiv);
  // body.appendChild(enterNamePage);
});
