import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wkmolhrryhrxuylmrbfj.supabase.co";
const supabaseAnonKey = "sb_publishable_Uk0AgbgYxqueHrOtFZm3OA_-SnrjPSl";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);