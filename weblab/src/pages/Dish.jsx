import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDishById } from "../services/db/authentication/apiAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "../loaders/Loader";
import useOrder from "../hooks/useOrder";
import ProfileBar from "../components/ProfileBar";
import useSubmitted from "../hooks/useSubmitted";
import useUpdatedOrder from "../hooks/useUpdatedOrder";
import toast from "react-hot-toast";

export default function Dish() {
  const { order, setOrder } = useOrder();
  const { u_order, setUOrder } = useUpdatedOrder();
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const { submitted } = useSubmitted();
  const { dishId } = useParams();

  const { data: dish, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => getDishById(dishId),
  });

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  function addToOrder() {
    console.log("submitted in dish: ", submitted);
    if (submitted) {
      const newUpdatedOrder = [...u_order.dishes];

      for (let i = 0; i < count; i++) {
        newUpdatedOrder.push({
          name: dish[0].name,
          price: dish[0].selling_price,
          image: dish[0].image,
          id: dishId,
          notes: note,
          id_category: dish[0].id_category,
        });
      }

      setUOrder((prevOrder) => ({
        ...prevOrder,
        dishes: newUpdatedOrder,
      }));
      return;
    }

    const newOrder = [...order.dishes];

    for (let i = 0; i < count; i++) {
      newOrder.push({
        name: dish[0].name,
        price: dish[0].selling_price,
        image: dish[0].image,
        id: dishId,
        notes: note,
        id_category: dish[0].id_category,
      });
    }

    setOrder((prevOrder) => ({
      ...prevOrder,
      dishes: newOrder,
    }));
    toast.success("Dish added successfully!"); // display notification when user click add to order
  }

  if (isLoadingSelect) return <Loader />;
  if (!dish || dish.length === 0) return <p>No dish found.</p>;

  const dishData = dish[0];

  function decreaseCount() {
    if (count - 1 < 1) return;
    setCount((i) => i - 1);
  }

  return (
    <div>
      <ProfileBar />
      <Link
        id="back"
        to="/home"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          color: "green",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>

      <div style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* <!-- Pizza Image --> */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "50px",
            height: "300px",
            overflow: "hidden",
          }}
        >
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
            {dishData?.name}
          </div>
          <div style={{ fontSize: "20px", color: "green" }}>
            {dishData.selling_price}
            <span
              style={{ fontSize: "16px", color: "grey", marginLeft: "10px" }}
            >
              Earn {(dishData.selling_price + 0.01) / 10} points
            </span>
          </div>
          {/* <!-- Ingredients --> */}
          <div style={{ color: "grey" }}>{dishData.description}</div>

          {/* <!-- Add a Note Section --> */}
          <textarea
            id="notes"
            placeholder="Add a note here"
            onChange={handleNoteChange}
            style={{
              width: "100%",
              marginTop: "8px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
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
                borderRadius: "10px",
              }}
            >
              -
            </button>
            <div style={{ margin: "0 15px", fontSize: "24px" }}>{count}</div>
            <button
              id="increase"
              onClick={() => setCount((i) => i + 1)}
              style={{
                width: "50px",
                height: "50px",
                lineHeight: "50px",
                textAlign: "center",
                backgroundColor: "#f2f2f2",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              +
            </button>
            {/* <!-- Add to Cart Button --> */}
            <button
              id="add_to_order"
              onClick={addToOrder}
              style={{
                // backgroundColor: "rgb(8, 99, 29)",
                color: "white",
                border: "none",
                // padding: "15px 30px",
                cursor: "pointer",
                marginLeft: "auto",
                borderRadius: "10px",
                backgroundColor: "#008000",
              }}
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
      <Link
        to="/order"
        style={{
          position: "fixed",
          bottom: "70px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          className="btn btn-success"
          style={{
            backgroundColor: "#008000",
            color: "white",
            borderRadius: "10px",
          }}
        >
          View Current Order
        </button>
      </Link>
    </div>
  );
}
