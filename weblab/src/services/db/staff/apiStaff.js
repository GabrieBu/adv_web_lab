import { supabase } from "../supabase";

export async function getTable() {
  let { data: tables, error } = await supabase
    .from("table")
    .select("*")
    .order("id_table", { ascending: true });

  if (error) console.log("No tables found");

  return tables;
}

export async function getOrdersWaiter(id) {
  const { data: manageData, error: manageError } = await supabase
    .from("manage")
    .select("id_order")
    .eq("id_staff", id);

  if (manageError) {
    throw new Error("Error fetching managed orders");
  }

  // Extract the order IDs from the "manage" table data
  const orderIds = manageData.map((item) => item.id_order);
  console.log("orderIds:", orderIds);

  const { data: ordersData, error: ordersError } = await supabase
    .from("order")
    .select("*")
    .eq("state", "Preparing")
    .in("id_order", orderIds);

  if (ordersError) throw new Error("Error fetching orders");

  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .neq("state", "Served")
    .in("id_order", orderIds);

  if (containsError) {
    throw new Error("Error fetching contains data for orders");
  }

  // Extract the dish IDs from the contains data
  const dishIds = containsData.map((containsItem) => containsItem.id_dish);

  // Fetch the dish names based on the extracted dish IDs
  const { data: dishesData, error: dishesError } = await supabase
    .from("food_drink")
    .select("*")
    .neq("id_category", 3) // Exclude dishes with id_category equal to 3
    .in("id_food_drink", dishIds); // Include only dishes with id_food_drink in dishIds

  if (dishesError) {
    throw new Error("Error fetching dish names");
  }

  return { ordersData, containsData, dishesData };
}

export async function getOrdersCooker(id) {
  const { data: manageData, error: manageError } = await supabase
    .from("manage")
    .select("id_order")
    .eq("id_staff", id);

  if (manageError) {
    throw new Error("Error fetching managed orders");
  }

  // Extract the order IDs from the "manage" table data
  const orderIds = manageData.map((item) => item.id_order);
  console.log("orderIds:", orderIds);

  const { data: ordersData, error: ordersError } = await supabase
    .from("order")
    .select("*")
    .eq("state", "Preparing")
    .in("id_order", orderIds);

  if (ordersError) throw new Error("Error fetching orders");

  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .eq("state", "Not Ready")
    .in("id_order", orderIds);

  if (containsError) {
    throw new Error("Error fetching contains data for orders");
  }

  // Extract the dish IDs from the contains data
  const dishIds = containsData.map((containsItem) => containsItem.id_dish);

  // Fetch the dish names based on the extracted dish IDs
  const { data: dishesData, error: dishesError } = await supabase
    .from("food_drink")
    .select("*")
    .neq("id_category", 3) // Exclude dishes with id_category equal to 3
    .in("id_food_drink", dishIds); // Include only dishes with id_food_drink in dishIds

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

export async function setStateDishId(id_order, id_dish, new_state) {
  const id_o = parseInt(id_order);
  const id_d = parseInt(id_dish);

  const { error: containsError } = await supabase
    .from("contains")
    .update({ state: new_state })
    .eq("id_order", id_o)
    .eq("id_dish", id_d);

  if (containsError) {
    console.log("Error Updating state dish");
    return;
  }
}

export async function getOrdersToPay() {
  const { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("state", "Ready For Paying")
    .order("id_table", { ascending: true });

  if (error) {
    console.log("Error Selecting orders");
    return;
  }

  console.log("data", data);
  return data;
}

export async function setStateOrderReadyForPaying(id_order) {
  const { error: oError } = await supabase
    .from("order")
    .update({ state: "Ready For Paying" })
    .eq("id_order", id_order);

  if (oError) {
    console.log("Error Updating state order");
    return;
  }
}

export async function getOrdersAdmin() {
  // Extract the order IDs from the "manage" table data

  const { data: ordersData, error: ordersError } = await supabase
    .from("order")
    .select("*")
    .neq("state", "Paid");

  if (ordersError) throw new Error("Error fetching orders");

  const orderIds = ordersData.map((item) => item.id_order);

  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .in("id_order", orderIds);

  if (containsError) {
    throw new Error("Error fetching contains data for orders");
  }

  // Extract the dish IDs from the contains data
  const dishIds = containsData.map((containsItem) => containsItem.id_dish);

  // Fetch the dish names based on the extracted dish IDs
  const { data: dishesData, error: dishesError } = await supabase
    .from("food_drink")
    .select("*")
    .in("id_food_drink", dishIds); // Include only dishes with id_food_drink in dishIds

  if (dishesError) {
    throw new Error("Error fetching dish names");
  }

  return { ordersData, containsData, dishesData };
}
