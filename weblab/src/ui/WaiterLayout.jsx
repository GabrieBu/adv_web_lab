import { getOrdersWaiter } from "../services/db/staff/apiStaff";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";
import { useState, useEffect } from "react";
import { setStateDishId } from "../services/db/staff/apiStaff";
import { setStateOrderReadyForPaying } from "../services/db/staff/apiStaff";

function WaiterLayout({ id }) {
  const [merged_data, setMergedData] = useState();

  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersWaiter(id),
  });

  useEffect(() => {
    if (!isLoading && data) {
      const initialMergedData = data.containsData.map((containsItem) => {
        const order = data.ordersData.find(
          (orderItem) => orderItem.id_order === containsItem.id_order
        );

        const dish = data.dishesData.find(
          (dishItem) => dishItem.id_food_drink === containsItem.id_dish
        );

        const dishName = dish ? dish.name : "N/A";
        const tableId = order ? order.id_table : "N/A";
        const createdAt = order ? order.created_at : "N/A";
        const orderId = order ? order.id_order : "N/A"; // Include order ID
        const dishId = containsItem.id_dish; // Include dish ID
        const state = containsItem.state === "Not Ready" ? "No" : "Yes"; // Include state

        return {
          dishName,
          tableId,
          createdAt,
          orderId,
          dishId,
          state,
        };
      });

      setMergedData(initialMergedData);
    }
  }, [isLoading, data]);

  const handleCheckboxChange = async (index, id_order, id_dish, event) => {
    const value = event.target.checked ? "Served" : "Ready";
    const newMergedData = [...merged_data];
    newMergedData[index] = {
      ...newMergedData[index],
      state: value, // Update isChecked property based on checkbox state
    };

    const allServed = newMergedData
      .filter((item) => item.orderId === id_order)
      .every((item) => item.state === "Served");

    // If all entries for the order are in the "Served" state, update the order state
    if (allServed) {
      await setStateOrderReadyForPaying(id_order);
    }

    await setStateDishId(id_order, id_dish, value);
    setMergedData(newMergedData); // Update state of mergedData
  };

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
          {merged_data?.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) =>
                    handleCheckboxChange(
                      index,
                      item.orderId,
                      item.dishId,
                      event
                    )
                  }
                />
              </td>
              <td>{item.dishName}</td>
              <td>{item.createdAt.split(":").slice(0, 2).join(":")}</td>
              <td>{item.tableId}</td>
              <td>{item.notes}</td>
              <td>{item.state}</td>
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
