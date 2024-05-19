import { supabase } from "../supabase";

export async function editOrder(order, id_order, price) {
  const { data: user } = await supabase.auth.getUser();

  const recordsToInsert = order.dishes.map((item) => ({
    id_order: id_order,
    id_dish: item.id,
    notes: item.notes,
    state: item.id_category === 3 ? "Ready" : "Not Ready",
  }));

  const { error: errorContain } = await supabase
    .from("contains")
    .insert(recordsToInsert);

  if (errorContain) {
    console.log("Error Contain");
    return;
  }

  const { data: pointsUser, error: errorPoints } = await supabase
    .from("user")
    .select("points")
    .eq("id", user.user.id);

  if (errorPoints) {
    console.log("Error selecting points");
    return;
  }

  const new_points = Math.floor(pointsUser[0].points + price / 10);

  const { error: errorUpdate } = await supabase
    .from("user")
    .update({ points: new_points })
    .eq("id", user.user.id);

  if (errorUpdate) {
    console.log("Error Updating points");
    return;
  }
}

function generatePassword() {
  const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";
  const numbers = "0123456789";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomSpecialCharacter =
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomUpperCaseLetter =
    upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  const randomPasswordPart = Math.random().toString(36).slice(2, 7); // Ensures length of 5 characters

  let password = `${randomUpperCaseLetter}${randomPasswordPart}${randomNumber}${randomSpecialCharacter}`;

  // Shuffle the password to ensure the characters are not in a predictable order
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

export async function placeOrder(order, tableid, price) {
  const { data: user } = await supabase.auth.getUser();
  var user_id = null;
  var bool = true;

  if (user === null) {
    console.log("user_anon");
    const pass = generatePassword();
    console.log(pass);
    var { data: user_anon, error } = await supabase.auth.signInWithPassword({
      email: `${Date.now()}@anon.com`,
      password: pass,
    });

    if (error) {
      console.error("Error creating anonymous user", error);
      return;
    }
    bool = false;
    user_id = user_anon.user.id;
  } else {
    user_id = user.user.id;
  }
  console.log(user_id);
  let { data: insertedOrder, error: errorOrder } = await supabase
    .from("order")
    .insert({ state: "Preparing", id_table: tableid, id_user: user_id })
    .select();

  if (errorOrder) {
    console.log("Error Order");
    return;
  }

  const recordsToInsert = order.dishes.map((item) => ({
    id_order: insertedOrder[0].id_order,
    id_dish: item.id,
    notes: item.notes,
    state: item.id_category === 3 ? "Ready" : "Not Ready",
  }));

  const { error: errorContain } = await supabase
    .from("contains")
    .insert(recordsToInsert);

  if (errorContain) {
    console.log("Error Contain");
    return;
  }
  if (bool) {
    const { data: pointsUser, error: errorPoints } = await supabase
      .from("user")
      .select("points")
      .eq("id", user.user.id);

    if (errorPoints) {
      console.log("Error selecting points");
      return;
    }

    const new_points = Math.floor(pointsUser[0].points + price / 10);

    const { error: errorUpdate } = await supabase
      .from("user")
      .update({ points: new_points })
      .eq("id", user.user.id);

    if (errorUpdate) {
      console.log("Error Updating points");
      return;
    }
  }

  return insertedOrder[0]?.id_order;
}

export async function getNotEmptyTable() {
  // empty is true
  let { data: tables, error } = await supabase
    .from("table")
    .select("*")
    .eq("state", false)
    .order("id_table", { ascending: true });

  if (error) console.log("No tables found");

  return tables;
}

export async function setPrepared(id_order) {
  const { error: errorUpdate } = await supabase
    .from("order")
    .update({ state: "Ready For Paying" })
    .eq("id_order", id_order);

  if (errorUpdate) {
    console.log("Error Updating state order");
    return;
  }
}

export async function getPoints() {
  const { data: user } = await supabase.auth.getUser();

  const { data: points_data, error } = await supabase
    .from("user")
    .select("points")
    .eq("id", user.user.id);

  if (error) {
    console.log("Error selecting points");
    return;
  }

  return points_data[0].points;
}

export async function payWithPoint(points_to_delete, previous_point, id_order) {
  const { data: user } = await supabase.auth.getUser();
  const { error: errorUpdate } = await supabase
    .from("user")
    .update({ points: Number(previous_point - points_to_delete) })
    .eq("id", user.user.id);

  if (errorUpdate) {
    console.log("Error Updating state order");
    return;
  }

  const { error: errorUpdateOrder } = await supabase
    .from("order")
    .update({ points_used: points_to_delete })
    .eq("id_order", id_order);

  if (errorUpdateOrder) {
    console.log("Error Updating state order");
    return;
  }
}
