import { useQuery } from "@tanstack/react-query";
import { getOrdersToPay, markAsPaid } from "../services/db/staff/apiStaff";
import Loader from "../loaders/Loader";
import { useState } from "react";

function Payment() {
  const { isLoading, data } = useQuery({
    queryKey: ["orders_pay"],
    queryFn: getOrdersToPay,
  });

  const { users, orders, dishes, contains } = data || {};

  const mergedArray = orders?.map((order) => {
    const user = users?.find((user) => user.id === order.id_user);
    return {
      ...order,
      name: user ? user.name : null,
      surname: user ? user.surname : null,
    };
  });

  const mergedData = contains?.map((containsItem) => {
    const dish = dishes.find(
      (dishItem) => dishItem.id_food_drink === containsItem.id_dish
    );
    const dishName = dish ? dish.name : "N/A";
    const sellingPrice = dish ? dish.selling_price : "N/A";
    const id_order = containsItem.id_order;

    return { id_order, dishName, sellingPrice };
  });

  const [expandedOrder, setExpandedOrder] = useState(null);

  if (isLoading) return <Loader />;

  async function handlePay(id_order, id_table) {
    await markAsPaid(id_order, id_table);
  }

  return (
    <div className="container">
      <h1>Orders</h1>
      <ul className="list-group">
        {mergedArray?.map((order, index) => {
          // Filter mergedData to get items associated with the current order
          const itemsForOrder = mergedData.filter(
            (item) => item.id_order === order.id_order
          );
          // Calculate the total price for the order
          const totalPrice = itemsForOrder.reduce(
            (acc, item) => acc + item.sellingPrice,
            0
          );

          return (
            <li className="list-group-item" key={index}>
              <div
                className="order-item"
                onClick={() =>
                  setExpandedOrder(expandedOrder === index ? null : index)
                }
              >
                {order.name} {order.surname} - Order Time:{" "}
                {order.created_at.split("T")[1].split(".")[0].slice(0, 5)}
              </div>
              {expandedOrder === index && (
                <div>
                  <p>Table: {order.id_table}</p>
                  <p>Items:</p>
                  <ul>
                    {itemsForOrder.map((item, idx) => (
                      <li key={idx}>
                        {item.dishName} - {item.sellingPrice} PLN
                      </li>
                    ))}
                  </ul>
                  <p>Total Price: {totalPrice.toFixed(2)} PLN</p>
                  <button
                    onClick={() => handlePay(order.id_order, order.id_table)}
                  >
                    Mark as paid
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Payment;
