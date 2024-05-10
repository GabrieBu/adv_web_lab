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
    .in("id_order", orderIds)
    .order("created_at");

  if (ordersError) throw new Error("Error fetching orders");

  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .eq("state", "Not Ready") //edit here
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
  const { data: orders, error } = await supabase
    .from("order")
    .select("*")
    .eq("state", "Complete")
    .order("id_table", { ascending: true });
  //.order("created_at");

  if (error) {
    console.log("Error selecting orders to be paid:", error.message);
    return;
  }

  const orderUsers = orders?.map((item) => item.id_user);

  const { data: users, error: usersError } = await supabase
    .from("user")
    .select("*")
    .in("id", orderUsers);

  if (usersError) {
    console.log("Error selecting users");
    return;
  }

  const orderIds = orders?.map((item) => item.id_order);
  console.log(orderIds);
  const { data: containsData, error: containsError } = await supabase
    .from("contains")
    .select("*")
    .in("id_order", orderIds);

  if (containsError) {
    throw new Error("Error fetching contains data for orders");
  }

  const dishIds = containsData?.map((containsItem) => containsItem.id_dish);

  const { data: dishesData, error: dishesError } = await supabase
    .from("food_drink")
    .select("*")
    .in("id_food_drink", dishIds); // Include only dishes with id_food_drink in dishIds

  if (dishesError) {
    throw new Error("Error fetching dish names");
  }

  return { orders, users, dishes: dishesData, contains: containsData };
}

export async function setStateOrderCompleted(id_order) {
  const { error: oError } = await supabase
    .from("order")
    .update({ state: "Complete" })
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

export async function getStaff() {
  const { data: ordersData, error: ordersError } = await supabase
    .from("order")
    .select("*")
    .neq("state", "Paid");

  if (ordersError) {
    console.log("Orders error");
    return;
  }

  const { data: cookersData, error: cookersError } = await supabase
    .from("staff")
    .select("*")
    .eq("id_role", 1);

  if (cookersError) {
    console.log("Cookers error");
    return;
  }

  const { data: waitersData, error: waitersError } = await supabase
    .from("staff")
    .select("*")
    .eq("id_role", 2);

  if (waitersError) {
    console.log("Waiters error");
    return;
  }

  return { ordersData, cookersData, waitersData };
}

export async function getManage() {
  const { data, error } = await supabase.from("manage").select("*");

  if (error) {
    console.log("Waiters error");
    return;
  }
  return data;
}

export async function updateOrderStaff(orderId, staffId, isAssigned) {
  console.log(orderId, staffId, isAssigned);
  if (isAssigned) {
    const { error } = await supabase
      .from("manage")
      .insert({ id_order: orderId, id_staff: staffId })
      .select();
    if (error) {
      console.log("Error Inserting");
    }
  } else {
    const { error } = await supabase
      .from("manage")
      .delete()
      .eq("id_order", orderId)
      .eq("id_staff", staffId);
    if (error) {
      console.log("Error deleting");
    }
  }
}

export async function markAsPaid(id_order, id_table) {
  const { error: oError } = await supabase
    .from("order")
    .update({ state: "Paid" })
    .eq("id_order", id_order);

  if (oError) {
    console.log("Error Updating state order");
    return;
  }
  const { error: tableError } = await supabase
    .from("table")
    .update({ state: true }) //empty
    .eq("id_table", id_table);

  if (tableError) {
    console.log("Error Updating state table");
    return;
  }
}
