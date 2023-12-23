
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nmymghgzjjijjeqivblj.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5teW1naGd6amppamplcWl2YmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NTI4MzIsImV4cCI6MjAxODEyODgzMn0.y1oM2PD6Wuu-byh4wB4PGhze57AcHuTES37A3zM7lc4";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;