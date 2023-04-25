//FREE PASSWORD: J2Rbw3U5wXsb86ZL

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fioyevfhztdmjtblclwj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb3lldmZoenRkbWp0YmxjbHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxNjM2MDYsImV4cCI6MTk5NzczOTYwNn0.ixyy-AxrTl7L5_N7ioWO3PhuxykgKovemF7g-TBIARs";
export const supabase = createClient(supabaseUrl, supabaseKey);
