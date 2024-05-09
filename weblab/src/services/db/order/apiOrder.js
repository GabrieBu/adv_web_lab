import { supabase } from "../supabase";

export async function placeOrder(order, tableid, price) {
  const { data: user } = await supabase.auth.getUser();
  let { data: insertedOrder, error: errorOrder } = await supabase
    .from("order")
    .insert({ state: "Preparing", id_table: tableid, id_user: user.user.id })
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

  return;
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
