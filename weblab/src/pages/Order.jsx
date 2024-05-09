import useOrder from "../hooks/useOrder";
import { getNotEmptyTable, placeOrder } from "../services/db/order/apiOrder";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProfileBar from "../components/ProfileBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function Order() {
  const { order, setOrder } = useOrder();
  order.tableId = "";
  const { register, handleSubmit } = useForm();
  const [errorMessages, setErrorMessages] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [price, setPrice] = useState(0);

  useTitle("Review Order");

  const { data: tables, isLoading: isLoadingaTables } = useQuery({
    queryKey: ["tables"],
    queryFn: getNotEmptyTable,
  });

  const removeDish = (index) => {
    const updatedDishes = [...order.dishes];
    updatedDishes.splice(index, 1);
    setOrder({ ...order, dishes: updatedDishes });
  };

  useEffect(() => {
    setPrice(order.dishes.reduce((acc, dish) => acc + dish.price, 0));
  }, [order]);

  if (isLoadingaTables) return <Loader />;

  function onSubmit(data) {
    if (order.dishes.length === 0) {
      setErrorMessages("Please add at least one dish");
      return;
    } else if (data.selectedTable === "") {
      setErrorMessages("Please select a table");
      return;
    } else {
      placeOrder(order, data.selectedTable, price.toFixed(2));
      setShowSubmitButton(false);
    }
  }

  return (
    <div>
      <ProfileBar active_page={"order"} />

      <div style={{ marginBottom: "250px", marginTop: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ padding: "10px" }}>
            <p></p>
            <h1 className="text-success text-center text-bg-light p-3 fixed-top">
              Review Order
            </h1>
            <p></p>
            <div style={{ color: "black" }}>
              {order.dishes.map((dish, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        margin: "0",
                      }}
                    >
                      {dish.name}{" "}
                    </h3>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => removeDish(index)}
                      style={{ marginLeft: "auto" }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ color: "red" }}
                        size="lg"
                      />
                    </button>
                  </div>
                  <p></p>
                  <div>
                    <p
                      style={{
                        color: "green",
                        fontSize: "1rem",
                        margin: "4px 0",
                      }}
                    >
                      PLN {dish.price}
                    </p>
                  </div>
                  <p></p>
                  {dish.notes === "" ? (
                    ""
                  ) : (
                    <div>
                      <b>Notes:</b> {dish.notes}
                    </div>
                  )}
                  <p></p>
                  <hr
                    style={{
                      color: "gray",
                      backgroundColor: "gray",
                      height: 1,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Add more Button */}
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "green",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "8px",
                    marginLeft: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "white" }}
                    size="lg"
                  />
                </div>
                <h5>Add more</h5>
              </div>
            </Link>

            <p>Total price:{price.toFixed(2)}</p>
          </div>
          {/* Submit button */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "207px",
              backgroundColor: "white",
            }}
          ></div>
          <hr
            style={{
              color: "gray",
              backgroundColor: "gray",
              height: 1,
              position: "fixed",
              bottom: "190px",
              left: 0,
              right: 0,
            }}
          />
          {showSubmitButton && (
            <div
              style={{
                position: "fixed",
                bottom: "75px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button type="submit" className="btn btn-success btn-lg">
                Submit the order
              </button>
              <p></p>
              <select {...register("selectedTable")}>
                <option value="">Select a table</option>
                {tables.map((table) => (
                  <option key={table.id_table} value={table.id_table}>
                    {table.id_table}
                  </option>
                ))}
              </select>
              {errorMessages && (
                <div className="text-danger">{errorMessages}</div>
              )}
            </div>
          )}
          {!showSubmitButton && (
            <div
              style={{
                position: "fixed",
                bottom: "110px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button type="button" className="btn btn-success btn-lg">
                Order submitted
              </button>
            </div>
          )}
        </form>
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
            position: "fixed",
            bottom: "40px",
            left: 0,
            right: 0,
          }}
        />
      </div>
    </div>
  );
}

export default Order;
