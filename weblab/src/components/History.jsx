import { useEffect } from "react";
import Loader from "../loaders/Loader";
import { getOrdersUser } from "../services/db/order/apiOrder";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
function History({ user_id }) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersUser(user_id),
  });

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  if (isLoading) return <Loader />;
  return (
    <div>
      Orders History
      <p></p>
    </div>
  );
}

export default History;
