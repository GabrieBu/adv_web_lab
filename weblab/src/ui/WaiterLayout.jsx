import { getOrders } from "../services/db/staff/apiStaff";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";

function WaiterLayout({ id }) {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(id),
  });

  const mergedData = data?.containsData.map((containsItem) => {
    // Find the corresponding order data
    const order = data?.ordersData.find(
      (orderItem) => orderItem.id_order === containsItem.id_order
    );

    // Find the corresponding dish data
    const dish = data?.dishesData.find(
      (dishItem) => dishItem.id_food_drink === containsItem.id_dish
    );

    // Extract relevant information
    const dishName = dish ? dish.name : "N/A";
    const tableId = order ? order.id_table : "N/A";
    const createdAt = order ? order.created_at : "N/A";

    // Return merged object
    return {
      dishName,
      tableId,
      createdAt,
    };
  });

  if (isLoading) return <Loader />;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Mark as Served</th>
            <th>Dish Name</th>
            <th>Order Time</th>
            <th>Table Number</th>
            <th>Notes</th>
            <th>Ready</th>
          </tr>
        </thead>
        <tbody>
          {mergedData.map((item, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.dishName}</td>
              <td>{item.createdAt}</td>
              <td>{item.tableId}</td>
              <td>{item.notes}</td>
              <td>No</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

WaiterLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WaiterLayout;
