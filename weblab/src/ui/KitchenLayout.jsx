import { useQuery } from "@tanstack/react-query";
import { getOrdersCooker } from "../services/db/staff/apiStaff";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";

function KitchenLayout({ id }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersCooker(id),
  });

  const mergedData = data?.containsData.map((containsItem) => {
    const order = data?.ordersData.find(
      (orderItem) => orderItem.id_order === containsItem.id_order
    );

    const dish = data?.dishesData.find(
      (dishItem) => dishItem.id_food_drink === containsItem.id_dish
    );

    const dishName = dish ? dish.name : "N/A";
    const createdAt = order ? order.created_at : "N/A";
    const tableId = order ? order.id_table : "N/A";
    const notes = containsItem.notes;

    return {
      dishName,
      createdAt,
      tableId,
      notes,
    };
  });

  if (isLoading) return <Loader />;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Mark as Ready</th>
            <th>Dish Name</th>
            <th>Order Time</th>
            <th>Table Number</th>
            <th>Notes</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

KitchenLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default KitchenLayout;
