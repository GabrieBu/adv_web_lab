import { supabase } from "../supabase";

export async function placeOrder(order) {
  const { data: user } = await supabase.auth.getUser();

  let { error: errorOrder } = await supabase
    .from("order")
    .insert({ state: "Preparing", id_table: 1, id_user: user.user.id });

  const recordsToInsert = order.dishes.map((item) => ({
    id_order: 8,
    id_dish: item.id,
    notes: item.notes,
  }));
  const { error: errorContain } = await supabase
    .from("contains")
    .insert(recordsToInsert);

  if (errorOrder) {
    console.log("Error Order");
    return;
  }
  if (errorContain) {
    console.log("Error Contain");
    return;
  }
  console.log("Correctly placed");
}
