import useOrder from "../hooks/useOrder";
import { getEmptyTable, placeOrder } from "../services/db/order/apiOrder";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Order() {
  const { order } = useOrder();
  const { register, handleSubmit } = useForm();

  useTitle("Review Order");
  const { data: tables, isLoading: isLoadingaTables } = useQuery({
    queryKey: ["tables"],
    queryFn: getEmptyTable,
  });

  useEffect(() => {
    console.log(order);
    console.log(tables);
  });

  if (isLoadingaTables) return <Loader />;

  function onSubmit(data) {
    placeOrder(order, data.selectedTable);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Review Order page
        <div style={{ color: "black" }}>
          {order.dishes.map((dish, index) => (
            <div key={index}>
              <div>
                <b>Name:</b> {dish.name}
              </div>
              <div>
                <b>Price:</b> {dish.price}
              </div>
              <div>
                <b>Notes:</b> {dish.notes}
              </div>
              <p></p>
            </div>
          ))}
        </div>
        <select {...register("selectedTable")}>
          <option value="">Select a table</option>
          {tables.map((table) => (
            <option key={table.id_table} value={table.id_table}>
              {table.id_table}
            </option>
          ))}
        </select>
        <p></p>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Order;
