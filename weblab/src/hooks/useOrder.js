import { useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

function useOrder() {
  const { order, setOrder } = useContext(OrderContext);

  return { order, setOrder };
}

export default useOrder;
