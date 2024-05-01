import { getOrders } from "../services/db/staff/apiStaff";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";

function WaiterLayout({ id }) {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(id),
  });

  if (isLoading) return <Loader />;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Mark as Served</th>
          <th>Dish Name</th>
          <th>Order Time</th>
          <th>Table ID</th>
          <th>Ready</th>
        </tr>
      </thead>
      <tbody>
        {data.ordersData.map((order, index) => {
          const containsForOrder = data.containsData.find(
            (contain) => contain.id_order === order.id_order
          );
          const dishForOrder = containsForOrder
            ? data.dishesData.find(
                (dish) => dish.id_dish === containsForOrder.id_dish
              )
            : null;
          const dishName = dishForOrder ? dishForOrder.name : "N/A";

          return (
            <tr key={`${order.id}_${index}`}>
              <td>
                <input type="checkbox" aria-label="Mark as Served" />
              </td>
              <td>{dishName}</td>
              <td>{order.created_at}</td>
              <td>{order.id_table}</td>
              <td>No</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

WaiterLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WaiterLayout;
