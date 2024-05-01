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
    <div>
      <thead>
        <tr>
          <th>Mark as Ready</th>
          <th>Name of the Dish</th>
          <th>Order Time</th>
          <th>Table</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order) => (
          <tr key={order.id_order}>
            <td>
              <input type="checkbox" />
            </td>
            <td>some_id_here</td>
            <td>{order.created_at}</td>
            <td>{order.id_table}</td>
            <td>some note here</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

KitchenLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default KitchenLayout;
