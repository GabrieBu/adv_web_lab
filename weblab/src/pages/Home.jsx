import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";
import DishItem from "../components/DishItem";
import { supabase } from "../services/db/supabase";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Home - Menu");
  const { data: dishes, isLoading: isLoadingDishes } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("food_drink").select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoadingDishes) return <Loader />;

  return (
    <div>
      <ProfileBar />
      <div>
        {dishes.map((item, i) => (
          <DishItem key={i} dishId={item.id_food_drink} />
        ))}
      </div>
    </div>
  );
}

export default Home;
