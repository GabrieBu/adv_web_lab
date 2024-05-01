import { supabase } from "../supabase";

export async function getUserLogged() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  return session;
}
