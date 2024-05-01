import { supabase } from "../supabase";

export async function filterByPrice(price) {
  let { data: food_drink, error } = await supabase
    .from("food_drink")
    .select("*")
    .lt("selling_price", price);

  if (error) {
    console.log("Error in filtering");
    return;
  }

  return food_drink;
}

export async function filterByCategory(name) {
  let { data: category, error: errorCategory } = await supabase
    .from("category")
    .select("id_category")
    .eq("name", name);

  if (errorCategory) {
    console.log("Error in filtering");
    return;
  }

  let { data: food_drink, error } = await supabase
    .from("food_drink")
    .select("*")
    .eq("id_category", category[0].id_category);

  if (error) {
    console.log("Error in filtering");
    return;
  }

  return food_drink;
}

export async function filterByisFood(bool) {
  let { data: food_drink, error } = await supabase
    .from("food_drink")
    .select("*")
    .eq("isFood", bool);

  if (error) {
    console.log("Error in filtering");
    return;
  }

  return food_drink;
}

export async function filterByType(name) {
  let { data: type, error: errorCategory } = await supabase
    .from("dish_type")
    .select("id_type")
    .eq("name", name);

  if (errorCategory) {
    console.log("Error in filtering");
    return;
  }

  let { data: food_drink, error } = await supabase
    .from("food_drink")
    .select("*")
    .eq("id_type", type[0].id_type);

  if (error) {
    console.log("Error in filtering");
    return;
  }

  return food_drink;
}
