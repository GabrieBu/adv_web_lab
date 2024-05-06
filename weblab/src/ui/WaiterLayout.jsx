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

  // Inline Styles
  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    header: {
      backgroundColor: "orange",
      color: "white",
      padding: "10px",
      fontSize: "16px",
    },
    row: {
      textAlign: "left",
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
  };

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
      <table className="table" style={styles.table}>
        <thead className="thead-light">
          <tr>
            <th style={styles.header}>Mark as Served</th>
            <th style={styles.header}>Dish Name</th>
            <th style={styles.header}>Order Time</th>
            <th style={styles.header}>Table Number</th>
            <th style={styles.header}>Notes</th>
            <th style={styles.header}>Ready</th>
          </tr>
        </thead>
        <tbody>
          {merged_data?.map((item, index) => (
            <tr key={index}>
              <td style={styles.row}>
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
              <td style={styles.row}>{item.dishName}</td>
              <td style={styles.row}>
                {item.createdAt.split(":").slice(0, 2).join(":")}
              </td>
              <td style={styles.row}>{item.tableId}</td>
              <td style={styles.row}>{item.notes}</td>
              <td style={styles.row}>{item.state}</td>
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
