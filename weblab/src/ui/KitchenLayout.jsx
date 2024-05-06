import { useQuery } from "@tanstack/react-query";
import { getOrdersCooker, setStateDishId } from "../services/db/staff/apiStaff";
import PropTypes from "prop-types";
import Loader from "../loaders/Loader";
import { useState } from "react";
import { useEffect } from "react";

function KitchenLayout({ id }) {
  const [merged_data, setMergedData] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersCooker(id),
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
    if (data) {
      const initialMergedData = data.containsData.map((containsItem) => {
        const order = data.ordersData.find(
          (orderItem) => orderItem.id_order === containsItem.id_order
        );

        const dish = data.dishesData.find(
          (dishItem) => dishItem.id_food_drink === containsItem.id_dish
        );

        const dishName = dish ? dish.name : "N/A";
        const createdAt = order ? order.created_at : "N/A";
        const tableId = order ? order.id_table : "N/A";
        const notes = containsItem.notes;
        const id_order = containsItem.id_order;
        const id_dish = containsItem.id_dish;
        const state = containsItem.state;

        return {
          dishName,
          createdAt,
          tableId,
          notes,
          id_order,
          id_dish,
          state,
        };
      });
      setMergedData(initialMergedData);
    }
  }, [data]);

  const handleCheckboxChange = async (index, id_order, id_dish, event) => {
    console.log("handle: ", id_order, id_dish);
    const value = event.target.checked ? "Ready" : "Cooking";
    const newMergedData = [...merged_data];
    newMergedData[index] = {
      ...newMergedData[index],
      state: value, // Update isChecked property based on checkbox state
    };

    await setStateDishId(id_order, id_dish, value);
    setMergedData(newMergedData); // Update state of mergedData
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <table className="table" style={styles.table}>
        <thead className="thead-light">
          <tr>
            <th style={styles.header}>Mark as Ready</th>
            <th style={styles.header}>Dish Name</th>
            <th style={styles.header}>Order Time</th>
            <th style={styles.header}>Table Number</th>
            <th style={styles.header}>Notes</th>
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
                      item.id_order,
                      item.id_dish,
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* <div className="table-responsive">
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
          {merged_data?.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) =>
                    handleCheckboxChange(
                      index,
                      item.id_order,
                      item.id_dish,
                      event
                    )
                  }
                />
              </td>
              <td>{item.dishName}</td>
              <td>{item.createdAt.split(":").slice(0, 2).join(":")}</td>
              <td>{item.tableId}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */

KitchenLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default KitchenLayout;
