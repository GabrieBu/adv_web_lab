import { createContext, useState, useEffect } from "react";
import Order from "../services/db/order/Order";
import PropTypes from "prop-types";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Load order from localStorage or initialize with a new Order instance
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder
      ? Object.assign(new Order(), JSON.parse(savedOrder))
      : new Order();
  });

  // Save order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};
