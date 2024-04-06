import { supabase } from "../supabase";

export async function getUserName() {
  let { data: name, error } = await supabase.from("users").select("name");

  if (error) console.log("Error in getting users name");

  return name;
}

export async function getDishById(dishId) {
  let { data: dish, error } = await supabase.from("food_drink").select("*").eq("id_food_drink", dishId);
   
  if (error) console.log("Error in getting dish by id");

  return dish;
}