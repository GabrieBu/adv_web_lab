import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/db/staff/apiStaff";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";

function KitchenLayout({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(id),
  });

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Mark as Cooked</th>
            <th>Name of the Dish</th>
            <th>Order Time</th>
            <th>Table Number</th>
            <th>Notes</th>
            <th>Served</th>
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
            const notes = containsForOrder ? containsForOrder.notes : "";

            return (
              <tr key={`${order.id}_${index}`}>
                <td>
                  <input type="checkbox" aria-label="Mark as Served" />
                </td>
                <td>{dishName}</td>
                <td>{order.created_at}</td>
                <td>{order.id_table}</td>
                <td>{notes}</td>
                <td>No</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

KitchenLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default KitchenLayout;
