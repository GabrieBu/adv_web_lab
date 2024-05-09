import { supabase } from "../supabase";

export async function getUserLogged() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  return session;
}

export async function getOrdersUser(id) {
  let { data: orders, error } = await supabase
    .from("order")
    .select("*")
    .eq("id_user", id)
    .eq("state", "Paid");

  if (error) {
    console.log("Error fetching orders:", error);
    return;
  }

  const orderIds = orders.map((item) => item.id_order);

  let { data: contains, error: errorContains } = await supabase
    .from("contains")
    .select("*")
    .in("id_order", orderIds);

  if (errorContains) {
    console.log("Error fetching orders:", errorContains);
    return;
  }

  const dishIds = contains.map((containsItem) => containsItem.id_dish);

  // Fetch the dish names based on the extracted dish IDs
  const { data: dishes, error: dishesError } = await supabase
    .from("food_drink")
    .select("*")
    .in("id_food_drink", dishIds); // Include only dishes with id_food_drink in dishIds

  if (dishesError) {
    console.log("Error fetching dish:", errorContains);
    return;
  }

  return { orders, contains, dishes };
}

export async function updateUsername(new_username, id) {
  const { error } = await supabase
    .from("user")
    .update({ username: new_username })
    .eq("id", id);

  if (error) {
    console.log("Error updating username");
    return;
  }
}

export async function updateName(new_name, id) {
  const { error } = await supabase
    .from("user")
    .update({ name: new_name })
    .eq("id", id);

  if (error) {
    console.log("Error updating name");
    return;
  }
}
export async function updateSurname(new_surname, id) {
  const { error } = await supabase
    .from("user")
    .update({ surname: new_surname })
    .eq("id", id);

  if (error) {
    console.log("Error updating surname");
    return;
  }
}
