import { paint } from "./help/paint";
import { paintStartScreen } from "./screens/startScreen";

// Supabase client setup
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fioyevfhztdmjtblclwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb3lldmZoenRkbWp0YmxjbHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxNjM2MDYsImV4cCI6MTk5NzczOTYwNn0.ixyy-AxrTl7L5_N7ioWO3PhuxykgKovemF7g-TBIARs";
export const supabase = createClient(supabaseUrl, supabaseKey);

// const channel = supabase
//   .channel('table-db-changes')
//   .on(
//     'postgres_changes',
//     {
//       event: '*',
//       schema: 'public',
//       table: 'users',
//     },
//     (payload) => {
//       // Create and insert DOM nodes representing each user
//       const users = payload.payload;
//       users.forEach(user => {
//         const userNode = document.createElement('div');
//         userNode.textContent = user.name;
//         document.body.appendChild(userNode);
//       });
//     }
//   )
//   .subscribe();
// channel.unsubscribe();

//!__________________________________________

//*Start Screen
paintStartScreen();

//*Name Screen

// clear out the HTML (due to the interaction fromt he prv screen)
// add the UI
// put an input that listens for the user typing, and input string length
// when the user types
//   if there is stuff in input, undisable the button
//   else if inputs empty then disable the button
// when user clicks confirm, add the user's input into supabase's DB

//*Team Confirm Screen
// add UI
// get all the names from DB
// display all the inputted names from supabase's DB
// if there is less

// when user clicks yes
//
// when user clicks no

// on client join, check for all current presences. delete any that  aren't in the DB. (idk put something in each presence)
