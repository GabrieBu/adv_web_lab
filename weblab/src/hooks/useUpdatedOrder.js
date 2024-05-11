import { useContext } from "react";
import { OrderUpdateContext } from "../contexts/OrderUpdateContext";

function useUpdatedOrder() {
  const { u_order, setUOrder } = useContext(OrderUpdateContext);

  return { u_order, setUOrder };
}

export default useUpdatedOrder;
