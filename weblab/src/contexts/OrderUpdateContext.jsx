import { createContext, useState } from "react";
import Order from "../services/db/order/Order";
import PropTypes from "prop-types";

export const OrderUpdateContext = createContext();

export const OrderUpdateProvider = ({ children }) => {
  const [u_order, setUOrder] = useState(() => new Order());

  return (
    <OrderUpdateContext.Provider value={{ u_order, setUOrder }}>
      {children}
    </OrderUpdateContext.Provider>
  );
};

OrderUpdateProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};
