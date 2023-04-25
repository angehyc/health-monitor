import { paint } from "./help/paint";
import { paintStartScreen } from "./screens/startScreen";
import { supabase } from "./supabase";

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
