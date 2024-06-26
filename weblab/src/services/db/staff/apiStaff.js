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
    .or("state.eq.Preparing,state.eq.Ordered")
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

export async function getOrdersPreparing() {
  const { data: orders, error } = await supabase
    .from("order")
    .select("*")
    .in("state", ["Preparing", "Ordered"])
    .order("id_table", { ascending: true });

  if (error) {
    console.log("Error selecting orders to be paid:", error.message);
    return;
  }

  const orderIds = orders?.map((item) => item.id_order);

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

  const { data: manageData, error: manageError } = await supabase
    .from("manage")
    .select("*")
    .in("id_order", orderIds); // Include only dishes with id_food_drink in dishIds

  if (manageError) {
    throw new Error("Error fetching manage");
  }

  const manageIds = manageData?.map((containsItem) => containsItem.id_staff);

  const { data: staffData, error: staffError } = await supabase
    .from("staff")
    .select("*")
    .in("id", manageIds); // Include only dishes with id_food_drink in dishIds

  if (staffError) {
    throw new Error("Error fetching manage");
  }

  return {
    orders,
    dishes: dishesData,
    contains: containsData,
    manage: manageData,
    staff: staffData,
  };
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
    .or("state.eq.Preparing,state.eq.Ordered")
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

export async function setStateDishId(id_contains, new_state) {
  const id_c = parseInt(id_contains);

  const { error: containsError } = await supabase
    .from("contains")
    .update({ state: new_state })
    .eq("id_contains", id_c);

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

export async function getCooks(id_order) {
  const { data, error } = await supabase
    .from("manage")
    .select("id_staff")
    .eq("id_order", id_order);

  const staffIds = data.map((item) => item.id_staff);

  if (error) {
    console.log("Cook error");
    return;
  }

  const { data: existingStaffData, error: existingStaffError } = await supabase
    .from("staff")
    .select("*")
    .eq("id_role", 1)
    .not("id", "in", `(${staffIds.join(",")})`); // Use not to select staff whose IDs are not in the staffIds array

  if (existingStaffError) {
    return;
  }

  return existingStaffData;
}

export async function getWaiters(id_order) {
  const { data, error } = await supabase
    .from("manage")
    .select("id_staff")
    .eq("id_order", id_order);

  if (error) {
    console.log("Waiters error");
    return;
  }

  const staffIds = data.map((item) => item.id_staff);

  const { data: existingStaffData, error: existingStaffError } = await supabase
    .from("staff")
    .select("*")
    .eq("id_role", 2)
    .not("id", "in", `(${staffIds.join(",")})`);
  // Use not to select staff whose IDs are not in the staffIds array

  if (existingStaffError) {
    return;
  }

  return existingStaffData;
}

export async function insertStaff(arr, id_order) {
  const filteredWaiters = arr
    .filter((waiter) => waiter !== false)
    .map((waiter) => ({
      id_staff: waiter,
      id_order: id_order,
    }));

  console.log(filteredWaiters);

  const { error } = await supabase.from("manage").insert(filteredWaiters);

  if (error) {
    console.log(error);
    return;
  }
}

export async function setPreparing(id_order) {
  console.log(id_order);
  const { error } = await supabase
    .from("order")
    .update({ state: "Preparing" })
    .eq("id_order", id_order);

  if (error) {
    console.log("Error Updating order state");
    return;
  }
}
