import { supabase } from "../supabase";

//STATE FOR AN ORDER:
// PREPARING
// PAID

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

  console.log(new_points);
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

export async function getEmptyTable() {
  // empty is true
  let { data: tables, error } = await supabase
    .from("table")
    .select("*")
    .eq("state", false)
    .order("id_table", { ascending: true });

  if (error) console.log("No tables found");

  return tables;
}

export async function getOrdersUser(id) {
  let { data: orders, error } = await supabase
    .from("order")
    .select("*")
    .eq("order.id_user", id);

  if (error) console.log("Error fetching orders:", error);

  const orderIds = orders.map((item) => item.id_order);

  let { data: contains, error: errorContains } = await supabase
    .from("contains")
    .select("id_dish")
    .in("id_order", orderIds);

  if (errorContains) console.log("Error fetching orders:", errorContains);

  console.log(contains);
  //return orders;
}
