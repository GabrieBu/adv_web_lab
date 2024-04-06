import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { getDishById } from "../services/db/authentication/apiAuth";

function DishItem({ dishId }) {
  const { data: dish, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => getDishById(dishId)
  });

  if (isLoadingSelect) return <Loader />;

  return (
    <div>
      <p>Test</p>
    </div>
  );
}

export default DishItem;
