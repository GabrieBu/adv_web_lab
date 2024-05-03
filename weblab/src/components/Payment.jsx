import { useQuery } from "@tanstack/react-query";
import { getOrdersToPay } from "../services/db/staff/apiStaff";
import Loader from "../loaders/Loader";
import { useState } from "react";

function Payment() {
  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersToPay,
  });

  const [expandedOrder, setExpandedOrder] = useState(null);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <h1>Orders</h1>
      <ul className="list-group">
        {data.map((order, index) => (
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
                <p>Created At: {order.created_at}</p>
                <p>Table: {order.id_table}</p>
                <p>User ID: {order.id_user}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payment;
