import { createContext, useState } from "react";
import Order from "../services/db/order/Order";
import PropTypes from "prop-types";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => new Order());

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};
