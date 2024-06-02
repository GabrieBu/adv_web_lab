import { createContext, useState, useEffect } from "react";
import Order from "../services/db/order/Order";
import PropTypes from "prop-types";

export const OrderUpdateContext = createContext();

export const OrderUpdateProvider = ({ children }) => {
  // Load u_order from localStorage or initialize with a new Order instance
  const [u_order, setUOrder] = useState(() => {
    const savedUOrder = localStorage.getItem("u_order");
    return savedUOrder
      ? Object.assign(new Order(), JSON.parse(savedUOrder))
      : new Order();
  });

  // Save u_order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("u_order", JSON.stringify(u_order));
  }, [u_order]);

  return (
    <OrderUpdateContext.Provider value={{ u_order, setUOrder }}>
      {children}
    </OrderUpdateContext.Provider>
  );
};

OrderUpdateProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};
