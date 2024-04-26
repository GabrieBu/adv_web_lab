import { useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

function useOrder() {
  const { order, setOrder } = useContext(OrderContext);
  // You can perform any additional logic here if needed

  return { order, setOrder };
}

export default useOrder;
