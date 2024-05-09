import { useQuery } from "@tanstack/react-query";
import { getOrdersToPay, markAsPaid } from "../services/db/staff/apiStaff";
import Loader from "../loaders/Loader";
import { useState } from "react";

function Payment() {
  const { isLoading, data } = useQuery({
    queryKey: ["orders_pay"],
    queryFn: getOrdersToPay,
  });

  const { users, orders } = data || {};

  const mergedArray = orders?.map((order) => {
    const user = users?.find((user) => user.id === order.id_user);
    return {
      ...order,
      name: user ? user.name : null,
      surname: user ? user.surname : null,
    };
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
        {mergedArray.map((order, index) => (
          <li className="list-group-item" key={index}>
            <div
              className="order-item"
              onClick={() =>
                setExpandedOrder(expandedOrder === index ? null : index)
              }
            >
              Order #{order.id_order} - {order.state}
            </div>
            {expandedOrder === index && (
              <div>
                <p>
                  Order Time:{" "}
                  {order.created_at.split("T")[1].split(".")[0].slice(0, 5)}
                </p>
                <p>Table: {order.id_table}</p>
                <p>
                  User: {order.name + " "} {order.surname}
                </p>
                <button
                  onClick={() => handlePay(order.id_order, order.id_table)}
                >
                  Mark as paid
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payment;
