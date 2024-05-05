import { useQuery } from "@tanstack/react-query";
import { getOrdersUser } from "../services/db/profile/apiProfile";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";

function History({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersUser(id),
  });

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

    // Calculate total amount of the order
    const totalAmount = orderDishes.reduce(
      (total, dish) => total + dish.selling_price,
      0
    );

    return {
      ...order,
      dishes: orderDishes,
      contains: orderContains,
      totalAmount: totalAmount,
    };
  });

  console.log("Merged orders", JSON.stringify(mergedOrders));

  return (
    <div>
      <h2>Order History</h2>
      {mergedOrders.map((order, index) => (
        <div key={index}>
          <p>Order #{order.id_order}</p>
          <p>Dishes:</p>
          <ul>
            {order.dishes.map((dish, index) => (
              <li key={index}>
                {dish.name} - Quantity: {dish.quantity} - Price: $
                {dish.selling_price} each
              </li>
            ))}
          </ul>
          <p>Total Amount: ${order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

History.propTypes = {
  id: PropTypes.string.isRequired,
};

export default History;
