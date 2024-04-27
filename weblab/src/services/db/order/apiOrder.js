import { supabase } from "../supabase";

export async function placeOrder(order, tableid) {
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

  console.log(recordsToInsert);
  const { error: errorContain } = await supabase
    .from("contains")
    .insert(recordsToInsert);

  if (errorContain) {
    console.log("Error Contain");
    return;
  }
  console.log("Correctly placed");
  return;
}

export async function getEmptyTable() {
  let { data: tables, error } = await supabase
    .from("table")
    .select("*")
    .eq("state", true)
    .order("id_table", { ascending: true });

  if (error) console.log("No tables found");

  return tables;
}
