import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDishById } from "../services/db/authentication/apiAuth";
import Loader from "../loaders/Loader";
import useOrder from "../hooks/useOrder";

export default function Dish() {
  const { order, setOrder } = useOrder();
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { dishId } = useParams();

  const { data: dish, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => getDishById(dishId),
  });

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  function addToOrder() {
    // Create a temporary array to accumulate the changes
    const newOrder = [...order.dishes];

    // Loop to add dishes to the newOrder array
    for (let i = 0; i < count; i++) {
      newOrder.push({
        name: dish[0].name,
        price: dish[0].selling_price,
        image: dish[0].image,
        id: dishId,
        notes: note,
      });
    }

    // Update the Order object with the new dishes array
    setOrder((prevOrder) => ({
      ...prevOrder,
      dishes: newOrder,
    }));
  }

  useEffect(() => {
    console.log(order);
  }, [order]);

  if (isLoadingSelect) return <Loader />;
  if (!dish || dish.length === 0) return <p>No dish found.</p>;

  const dishData = dish[0];

  function decreaseCount() {
    if (count - 1 < 1) return;
    setCount((i) => i - 1);
  }

  return (
    <div style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
      {/* <!-- Back Arrow --> */}
      <button
        onClick={() => navigate("/home")}
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        &larr;
      </button>

      {/* <!-- Pizza Image --> */}
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        {/* <!-- added padding to make space for the back button --> */}
        <img
          src={dishData?.image}
          alt={dishData.id_food_drink}
          style={{ width: "80%", maxWidth: "300px" }}
        />
        {/* <!-- Decreased size --> */}
      </div>

      {/* <!-- Pizza Name and Price --> */}
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Pizza Double Pepperoni
        </div>
        <div style={{ fontSize: "20px", color: "green" }}>
          {dishData.selling_price}
          <span style={{ fontSize: "16px", color: "grey" }}>
            Earn {(dishData.selling_price + 0.01) / 10} points
          </span>
        </div>
        {/* <!-- Ingredients --> */}
        <div style={{ color: "grey" }}>{dishData.description}</div>

        {/* <!-- Add a Note Section --> */}
        <textarea
          placeholder="Add a note here"
          onChange={handleNoteChange}
          style={{
            width: "100%",
            marginTop: "8px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        ></textarea>

        {/* <!-- Quantity Controls --> */}
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <button
            onClick={decreaseCount}
            style={{
              width: "50px",
              height: "50px",
              lineHeight: "50px",
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <div style={{ margin: "0 15px", fontSize: "24px" }}>{count}</div>
          <button
            onClick={() => setCount((i) => i + 1)}
            style={{
              width: "50px",
              height: "50px",
              lineHeight: "50px",
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              cursor: "pointer",
            }}
          >
            +
          </button>
          {/* <!-- Add to Cart Button --> */}
          <button
            onClick={addToOrder}
            style={{
              backgroundColor: "rgb(8, 99, 29)",
              color: "white",
              border: "none",
              padding: "15px 30px",
              cursor: "pointer",
              marginLeft: "auto",
              borderRadius: "20px",
            }}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
