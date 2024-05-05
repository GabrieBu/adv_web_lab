import { supabase } from "../supabase";

export async function loginApi(auth) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: auth.email,
    password: auth.password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function registerApi(auth) {
  let { data, error_reg } = await supabase.auth.signUp({
    email: auth.email,
    password: auth.password,
  });

  const { error_ins } = await supabase.from("user").insert({
    id: data.user.id,
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

export async function getSession() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  console.log("session", session);
  return session;
}

export async function getUserLogged() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function getUser(id) {
  let { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id);

  if (error) console.log("Nobody user found");

  return user[0];
}

export async function getAdmin(id) {
  let { data: admin, error } = await supabase
    .from("staff")
    .select("*")
    .eq("id", id);

  if (error) console.log("Nobody staff found");

  return admin[0];
}

export async function getDishById(dishId) {
  let { data: dish, error } = await supabase
    .from("food_drink")
    .select("*")
    .eq("id_food_drink", dishId);

  if (error) console.log("Error in getting dish by id");

  return dish;
}
