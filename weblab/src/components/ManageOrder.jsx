import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  getCooks,
  getWaiters,
  insertStaff,
} from "../services/db/staff/apiStaff";
import { useForm } from "react-hook-form";

function ManageOrder({ type, data }) {
  const [selectedOrder2, setSelectedOrder2] = useState(null);
  const [toSelectWaiter, setSelectWaiter] = useState(null);
  const [toSelectCook, setSelectCook] = useState(null);
  const [showWaitersList, setShowWaitersList] = useState(false);
  const [showCooksList, setShowCooksList] = useState(false);
  const [order, setOrder] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (obj) => {
    if (obj.waiters) insertStaff(obj.waiters, order);
    else if (obj.cooks) insertStaff(obj.cooks, order);
  };

  const getButtonColor = (state) => {
    switch (state) {
      case "Not Ready":
        return "#dc3545"; // Red
      case "Ready":
        return "#ffc107"; // Yellow
      case "Served":
        return "#28a745"; // Green
      default:
        return "#6c757d"; // Gray (default color)
    }
  };

  const handleAddWaiter = async (id_order) => {
    const existingStaffData = await getWaiters(id_order);
    setSelectWaiter(existingStaffData);
    setShowWaitersList((i) => !i);
    setOrder(id_order);
  };

  const handleAddCook = async (id_order) => {
    const existingStaffData = await getCooks(id_order);
    setSelectCook(existingStaffData);
    setShowCooksList((i) => !i);
    setOrder(id_order);
  };

  return (
    <>
      <h2>{type === "Ordered" ? "Ordered" : "In preparation"}</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.orders
          .filter((order) => order.state === type)
          .map((order) => {
            const dishesInOrder = data.contains.filter(
              (containsItem) => containsItem.id_order === order.id_order
            );
            const staffForOrder = data.manage
              .filter((manageItem) => manageItem.id_order === order.id_order)
              .map((manageItem) => {
                const staffInfo = data.staff.find(
                  (staffItem) => staffItem.id === manageItem.id_staff
                );
                return staffInfo;
              });

            // Filter staff for cooks (id_role = 1)
            const cooks = staffForOrder.filter(
              (staffItem) => staffItem.id_role === 1
            );

            const waiters = staffForOrder.filter(
              (staffItem) => staffItem.id_role === 2
            );

            const isOpen = selectedOrder2 === order.id_order;
            return (
              <div
                key={order.id_order}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <button
                  style={{
                    marginBottom: "10px",
                    backgroundColor: getButtonColor(order.state), // Set button color based on dish state
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setSelectedOrder2((prevState) =>
                      prevState === order.id_order ? null : order.id_order
                    )
                  }
                >
                  Order ID: {order.id_order} -{" "}
                  {order.created_at.split("T")[1].split(".")[0].slice(0, 5)}
                </button>
                {isOpen && (
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      {dishesInOrder.map((containsItem) => {
                        const dish = data.dishes.find(
                          (dishItem) =>
                            dishItem.id_food_drink === containsItem.id_dish
                        );
                        const dishState = containsItem.state;
                        return (
                          <div
                            key={containsItem.id_contains} // Use id_contains as key
                            style={{ color: getButtonColor(dishState) }}
                          >
                            {dish ? dish.name : "N/A"} - State: {dishState}
                          </div>
                        );
                      })}
                    </div>
                    {/* Cooks section */}
                    <h3>Cook:</h3>
                    <div>
                      {cooks.map((cook) => (
                        <div key={cook.id}>
                          <h5>
                            {cook.name} {cook.surname}
                          </h5>
                        </div>
                      ))}
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          marginTop: "8px",
                        }}
                        onClick={() => handleAddCook(order.id_order)}
                      >
                        <FaPlus />
                      </button>
                      <p></p>
                      {showCooksList && (
                        <div>
                          <h4>Select Cooks:</h4>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            {toSelectCook?.map((cook, index) => (
                              <React.Fragment key={index}>
                                <input
                                  type="checkbox"
                                  {...register(`cooks.${index}`)}
                                  value={cook.id}
                                />
                                <span>{` ${cook.name} ${cook.surname}`}</span>
                                <p></p>
                              </React.Fragment>
                            ))}
                            <button type="submit">Save</button>
                          </form>
                        </div>
                      )}
                    </div>
                    <p></p>
                    {/* Waiters section */}
                    <h3>Waiter:</h3>
                    <div>
                      {waiters.map((waiter) => (
                        <div key={waiter.id}>
                          <h5>
                            {waiter.name} {waiter.surname}
                          </h5>
                        </div>
                      ))}
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          marginTop: "8px",
                        }}
                        onClick={() => handleAddWaiter(order.id_order)} // Call handleAddWaiter function with order ID
                      >
                        <FaPlus />
                      </button>
                      <p></p>
                      {showWaitersList && (
                        <div>
                          <h4>Select Waiters:</h4>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            {toSelectWaiter?.map((waiter, index) => (
                              <React.Fragment key={index}>
                                <input
                                  type="checkbox"
                                  {...register(`waiters.${index}`)}
                                  value={waiter.id}
                                />
                                <span>{` ${waiter.name} ${waiter.surname}`}</span>
                                <p></p>
                              </React.Fragment>
                            ))}
                            <button type="submit">Save</button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

ManageOrder.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    orders: PropTypes.array.isRequired,
    contains: PropTypes.array.isRequired,
    manage: PropTypes.array.isRequired,
    staff: PropTypes.array.isRequired,
    dishes: PropTypes.array.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    waiters: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    ),
  }),
};

export default ManageOrder;
