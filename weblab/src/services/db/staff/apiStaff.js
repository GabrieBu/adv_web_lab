import { supabase } from "../supabase";

export async function getTable() {
  let { data: tables, error } = await supabase
    .from("table")
    .select("*")
    .order("id_table", { ascending: true });

  if (error) console.log("No tables found");

  return tables;
}

export async function getOrders(id) {
  const { data: manageData, error: manageError } = await supabase
    .from("manage")
    .select("id_order")
    .eq("id_staff", id);

  if (manageError) {
    throw new Error("Error fetching managed orders");
  }

  // Extract the order IDs from the "manage" table data
  const orderIds = manageData.map((item) => item.id_order);

  // Fetch the orders based on the extracted order IDs
  const { data: ordersData, error: ordersError } = await supabase
    .from("order")
    .select("*")
    .in("id_order", orderIds);

  if (ordersError) throw new Error("Error fetching orders");

  const orderIdsFromOrdersData = ordersData.map((order) => order.id_order);

  // Fetch the dishes for the extracted order IDs from the "contains" table
  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .in("id_order", orderIdsFromOrdersData);

  if (containsError) {
    throw new Error("Error fetching contains data for orders");
  }

  // Extract the dish IDs from the contains data
  const dishIds = containsData.map((containsItem) => containsItem.id_dish);

  // Fetch the dish names based on the extracted dish IDs
  const { data: dishesData, error: dishesError } = await supabase
    .from("food_drink")
    .select("name")
    .in("id_food_drink", dishIds);

  if (dishesError) {
    throw new Error("Error fetching dish names");
  }

  return { ordersData, containsData, dishesData };
}

export async function getTables() {
  const { data, error } = await supabase
    .from("table")
    .select("*")
    .order("id_table", { ascending: true });

  if (error) {
    console.log("Error retrieving tables");
    return;
  }

  return data;
}

export async function setStateTable(id_table, value) {
  const { error: errorUpdate } = await supabase
    .from("table")
    .update({ state: value })
    .eq("id_table", id_table);

  if (errorUpdate) {
    console.log("Error Updating state table");
    return;
  }
}
