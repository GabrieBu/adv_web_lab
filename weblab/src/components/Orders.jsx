import { useQuery } from "@tanstack/react-query";
import { getOrdersAdmin } from "../services/db/staff/apiStaff";
import Loader from "../loaders/Loader";

function Orders() {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersAdmin,
  });

  // Merge data for each contains row
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
    const orderTime = order ? order.created_at : "N/A";
    const tableId = order ? order.id_table : "N/A";
    let state_cooker = null;
    let state_waiter = null;
    if (containsItem.state === "Ready") {
      state_cooker = "Ready";
      state_waiter = "Not Served";
    } else if (containsItem.state === "Served") {
      state_cooker = "Ready";
      state_waiter = "Served";
    } else if (containsItem.state === "Not Ready") {
      state_cooker = "Not Ready";
      state_waiter = "Not Served";
    }

    // Return merged object
    return { dishName, orderTime, tableId, state_cooker, state_waiter };
  });

  if (isLoading) return <Loader />;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Dish name</th>
          <th>Order Time</th>
          <th>Table ID</th>
          <th>Cook Status</th>
          <th>Waiter Status</th>
        </tr>
      </thead>
      <tbody>
        {mergedData?.map((item, index) => (
          <tr key={index}>
            <td>{item.dishName}</td>
            <td>{item.orderTime.split(":").slice(0, 2).join(":")}</td>
            <td>{item.tableId}</td>
            <td>{item.state_cooker}</td>
            <td>{item.state_waiter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Orders;
