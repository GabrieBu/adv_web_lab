import { useEffect } from "react";
import useOrder from "../hooks/useOrder";
import { placeOrder } from "../services/db/order/apiOrder";

function Order() {
  const { order } = useOrder();

  useEffect(() => {
    console.log(order);
  }, [order]);

  function handleSubmit() {
    placeOrder(order);
  }
  return (
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
          </div>
        ))}
      </div>
      {/*<h1>Total price: {order.totalPrice()}</h1>*/}
      <p></p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Order;
