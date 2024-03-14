import supabase from "../supabase";

export async function getUsersName() {
  let { data: name, error } = await supabase.from("users").select("name");

  if (error) console.log("Error in gettin users name");

  return name;
}
