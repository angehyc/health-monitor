import { supabase } from "../main";

export const startHeartbeat = async (userId) => {
  // first heartbeat
  await supabase
    .from("users")
    .update({ heartbeat: new Date() })
    .match({ user_id: userId });

  const heartbeat = setInterval(async () => {
    // update heartbeat to current time...
    // have other users clear those who miss a heartbeat!
    await supabase
      .from("users")
      .update({ heartbeat: new Date() })
      .match({ user_id: userId });
  }, 5000);

  // clearHeartbeat
  return () => {
    clearInterval(heartbeat);
  };
};

async function removeDeadUsers() {
  // get all users from the database
  const { data: users } = await supabase.from("users").select("*");

  // filter the users array for only users with a heartbeat of over 10 seconds before now.
  const deadUsers = users.filter((user) => {
    const lastActive = new Date(user.heartbeat);
    const cutoffTime = new Date();
    cutoffTime.setSeconds(cutoffTime.getSeconds() - 10);
    return lastActive < cutoffTime;
  });

  // delete all the dead users
  for (const user of deadUsers) {
    console.log(user.user_id, user.user_name, "is dead!");
    await supabase.from("users").delete().match({ user_id: user.user_id });
  }
  console.log("DEADUSERS:", deadUsers);
  console.log("USERS:", users);

  // revert back to the waiting room if everyone is dead
  if (deadUsers.length === users.length) {
    await supabase.from("room").update({ status: null }).match({ room_id: 2 });
  }
}

export const startCleanupProcess = async () => {
  removeDeadUsers();

  setInterval(() => {
    removeDeadUsers();
  }, 30000);
};
