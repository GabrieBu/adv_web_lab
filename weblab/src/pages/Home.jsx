import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";
import DishItem from "../components/DishItem";
import { supabase } from "../services/db/supabase";

function Home() {
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
      {/* <div className="header d-flex flex-column justify-content-center align-items-center vh-100">
        {user.map((item, i) => (
          <h1 className="text-center" key={i}>
            Welcome {item.name}
          </h1>
        ))}
        <button className="btn btn-primary">Let's go to the meal</button>
      </div> */}
      <div>
        {dishes.map((item, i) => (
          <DishItem key={i} dishId={item.id_food_drink} />
        ))}
      </div>
    </div>
  );
}

export default Home;
