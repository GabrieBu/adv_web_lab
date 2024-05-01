import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "./constants";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// https://github.com/orgs/supabase/discussions/256
// OFFICIAL DOCUMENTATION
// https://supabase.com/docs/guides/api/securing-your-api
