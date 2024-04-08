/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { getDishById } from "../services/db/authentication/apiAuth";

function DishItem({ dishId }) {
  const { data: dish, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => getDishById(dishId),
  });

  if (isLoadingSelect) return <Loader />;

  return (
    <div>
      <h3>{dish[0].name}</h3>
      <p>{dish[0].description}</p>
      <p>{dish[0].selling_price}</p>
      <img {dish[0]?.image}/>
    </div>
  );
}

export default DishItem;
