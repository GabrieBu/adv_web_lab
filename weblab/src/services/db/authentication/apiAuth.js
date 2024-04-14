import { supabase } from "../supabase";

export async function getUserName() {
  let { data: name, error } = await supabase.from("users").select("name");

  if (error) console.log("Error in getting users name");

  return name;
}

export async function loginApi(auth) {
  const { data, error } = await supabase.auth.signInWithPassword(auth);

  if (error) throw new Error(error.message);
  return data;
}

export async function registerApi(auth) {
  let { data, error_reg } = await supabase.auth.signUp({
    email: auth.email,
    password: auth.password,
  });

  const { error_ins } = await supabase.from("user").insert({
    id: data.id,
    name: auth.name,
    surname: auth.surname,
    username: auth.username,
    points: 0,
  });

  if (error_reg || error_ins)
    throw new Error(error_reg.message + error_ins.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) return;
}

export async function resetPassword(auth) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(auth);

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePassword(auth) {
  const { data, error } = await supabase.auth.updateUser({
    email: auth.email,
    password: auth.password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getUserLogged() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function getDishById(dishId) {
  let { data: dish, error } = await supabase
    .from("food_drink")
    .select("*")
    .eq("id_food_drink", dishId);

  if (error) console.log("Error in getting dish by id");

  return dish;
}
