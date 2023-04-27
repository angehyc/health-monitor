import { paint } from "../help/paint";
import { generateId } from "../help/id";

import { supabase } from "../main";
import { paintStartScreen } from "./startScreen";
import { paintTeamConfirmScreen } from "./teamConfirmScreen";

const nameScreen = /*html*/ `
  <div
  id="#background"
  class="w-full h-screen bg-center bg-cover flex justify-center bg-[url('/AA9A10EB-D263-4527-9D8D-67F46D72D788.JPG')]"
  >
  <div class="flex flex-col justify-center">
    <button class="fixed top-0 left-0 pl-[40px] pt-[40px] text-[#fff] italic font-times-new-roman text-3xl" id="backButton">back</button>

    <div class="bg-[#FF00F5] justify-center items-center px-10 py-10 flex gap-10">
      <div class="flex flex-col gap-3">
        <p class="font-comic-sans pb-[8px] text-[#FFF] text-3xl">
          what's your name?
        </p>
        <input class="border border-black w-96 h-30 p-4 text-5xl text-blue-600" id="nameInput" type="text" />
      </div>
      <button
        class="bg-green-500 text-[#fff] text-2xl font-comic-sans rounded-full px-6 py-8 -skew-y-12"
        id="confirmButton"
      >
        confirm
      </button>
    </div>
  </div>
  </div>


`;

export const paintNameScreen = () => {
  // paint ui
  const body = document.querySelector("body");
  paint(nameScreen, body);

  // add our logic + event listeners
  const backButton = document.querySelector("#backButton");
  backButton.addEventListener("click", () => {
    paintStartScreen();
  });

  const nameInput = document.querySelector("#nameInput");

  const confirmButton = document.querySelector("#confirmButton");

  confirmButton.addEventListener("click", async () => {
    const newUserId = generateId();
    const { data } = await supabase
      .from("users")
      .insert({ user_id: newUserId, username: nameInput.value });
    console.log(data);

    paintTeamConfirmScreen(newUserId);
  });
};
