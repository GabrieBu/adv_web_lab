import { useQuery } from "@tanstack/react-query";
import { getOrdersUser } from "../services/db/profile/apiProfile";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";
import { useState } from "react"; // Import useState for managing local state

function History({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersUser(id),
  });

  // State to manage which order's details are visible
  const [visibleOrder, setVisibleOrder] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  const mergedOrders = data.orders.map((order) => {
    const orderContains = data.contains.filter(
      (item) => item.id_order === order.id_order
    );
    const orderDishes = orderContains.map((containsItem) => {
      return {
        ...data.dishes.find(
          (dishItem) => dishItem.id_food_drink === containsItem.id_dish
        ),
        quantity: containsItem.quantity, // Add quantity to the dish object
      };
    });

    const totalAmount = orderDishes.reduce(
      (total, dish) => total + dish.selling_price,
      0
    );

    return {
      ...order,
      dishes: orderDishes,
      contains: orderContains,
      totalAmount: totalAmount,
      points_used: order.points_used,
    };
  });

  const toggleOrder = (id_order) => {
    if (visibleOrder === id_order) {
      setVisibleOrder(null);
    } else {
      setVisibleOrder(id_order);
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      {mergedOrders.map((order, index) => (
        <div key={index}>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => toggleOrder(order.id_order)}
          >
            {order.created_at.split("T")[0]} <b> View details</b>
          </p>
          {visibleOrder === order.id_order && (
            <div>
              <p style={{ fontWeight: "bold"}}>Dishes:</p>
              <ul>
                {order.dishes.map((dish, index) => (
                  <li key={index}>
                    {dish.name + " "}
                    {dish.selling_price} PLN
                  </li>
                ))}
              </ul>
              <p style={{ fontWeight: "bold"}}>Total Amount: {order.totalAmount.toFixed(2)} PLN</p>
              <p style={{ fontWeight: "bold"}}>Points used: {order.points_used}</p>
              <p style={{ fontWeight: "bold"}}>
                <b >Amount paid</b>:{" "}
                {(order.totalAmount.toFixed(2) - order.points_used).toFixed(2)}{" "}
                PLN
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

History.propTypes = {
  id: PropTypes.string.isRequired,
};

export default History;
