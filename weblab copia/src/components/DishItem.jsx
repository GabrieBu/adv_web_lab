import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { getDishById } from "../services/db/authentication/apiAuth";
import { useNavigate } from "react-router-dom";

function DishItem({ dishId }) {
  const navigate = useNavigate();
  const { data: dish, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["dish", dishId],
    queryFn: () => getDishById(dishId),
  });

  const [showDescription, setShowDescription] = useState(false);

  if (isLoadingSelect) return <Loader />;
  if (!dish || dish.length === 0) return <p>No dish found.</p>;

  const dishData = dish[0];

  const dishItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
    borderBottom: "1px solid #e0e0e0",
  };

  const dishContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  };

  const dishNameStyle = {
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "0",
  };

  const dishPriceStyle = {
    color: "green",
    fontSize: "1rem",
    margin: "4px 0",
  };

  const dishImageContainerStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const dishImageStyle = {
    borderRadius: "10px",
    objectFit: "cover",
    width: "150px",
    height: "100px",
    marginRight: "10px",
    marginBottom: "15px",
  };

  const dishDescriptionStyle = {
    textAlign: "center",
    marginTop: "10px",
    display: showDescription ? "block" : "none",
  };

  const addButtonStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ffa500",
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div style={dishItemStyle}>
      <div style={dishContentStyle}>
        <h3 style={dishNameStyle}>{dishData.name}</h3>
        <p style={dishPriceStyle}>PLN {dishData.selling_price}</p>
      </div>
      <div style={dishImageContainerStyle} onClick={toggleDescription}>
        <img
          alt={`Dish ${dishData.name}`}
          src={dishData.image}
          style={dishImageStyle}
        />
        <button
          style={addButtonStyle}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the click from triggering the toggleDescription
            navigate(`/dish/${dishId}`);
          }}
        >
          +
        </button>
        <p style={dishDescriptionStyle}>{dishData.description}</p>{" "}
        {/* Description is now here */}
      </div>
    </div>
  );
}

DishItem.propTypes = {
  dishId: PropTypes.node.isRequired, // specify that children can be any renderable React node
};

export default DishItem;
