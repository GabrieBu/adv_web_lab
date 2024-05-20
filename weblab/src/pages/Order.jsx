import useOrder from "../hooks/useOrder";
import useUpdatedOrder from "../hooks/useUpdatedOrder";
import toast from "react-hot-toast";
import {
  editOrder,
  getNotEmptyTable,
  getPoints,
  placeOrder,
  payWithPoint,
} from "../services/db/order/apiOrder";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProfileBar from "../components/ProfileBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSubmitted } from "../contexts/SubmittedContext";
import { useUser } from "../hooks/useUser";

function Order() {
  const { order, setOrder } = useOrder();
  const { submitted, setSubmitted } = useSubmitted();
  const { u_order, setUOrder } = useUpdatedOrder();
  const { id, user } = useUser();

  order.tableId = "";
  const { register, handleSubmit } = useForm();
  const { register: register_point, handleSubmit: handleSubmitPoint } =
    useForm();
  const [errorMessages, setErrorMessages] = useState("");
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

  const removeDishUpdate = (index) => {
    const updatedDishes = [...u_order.dishes];
    updatedDishes.splice(index, 1);
    setUOrder({ ...u_order, dishes: updatedDishes });
  };

  useEffect(() => {
    setPrice(order.dishes.reduce((acc, dish) => acc + dish.price, 0));
  }, [order]);

  if (isLoadingaTables) return <Loader />;

  async function onSubmit(data) {
    if (order.dishes.length === 0) {
      setErrorMessages("Please add at least one dish");
      return;
    } else if (data.selectedTable === "") {
      setErrorMessages("Please select a table");
      return;
    } else {
      setSubmitted(true);
      const id_order = await placeOrder(
        order,
        data.selectedTable,
        price.toFixed(2),
        id
      );
      order.id_order = id_order;
      toast.success("Order placed successfully");
    }
  }

  function handleEdit() {
    editOrder(u_order, order.id_order, price.toFixed(2));
    setOrder({ ...order, dishes: [...order.dishes, ...u_order.dishes] });
    setUOrder({ ...u_order, dishes: [] });
    toast.success("Order edited successfully");
  }

  async function onSubmitPoint(data) {
    const points = await getPoints();

    if (Number(data.points) > points) {
      toast.error("You don't have enough points", {
        duration: 4000,
      });
    } else {
      toast.dismiss();
      toast.success("Points used to pay", { duration: 4000 });
      payWithPoint(Number(data.points), points, order.id_order);
      setOrder({ ...order, id: null, dishes: [] });
    }
  }

  const handleAccept = () => {
    toast.custom(
      <div
        style={{
          position: "relative",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          color: "var(--color-grey-700)",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "16px" }}>
          <h1 style={{ color: "green", fontWeight: "bold" }}>
            You have {user.points} points
          </h1>
          Please enter the number of points which you want to pay with:
        </div>
        <form onSubmit={handleSubmitPoint(onSubmitPoint)}>
          <input
            id="points"
            type="number"
            placeholder="e.g. 10"
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            {...register_point("points", {
              required: "This field is required",
            })}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => toast.dismiss()}
            >
              Dismiss
            </button>
            <button
              type="submit"
              style={{
                marginLeft: "8px",
                padding: "8px 16px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>,
      {
        duration: 10000, // Optional: Set the duration as needed
        position: "top-center", // Change the toast position
        style: {
          margin: "20px", // Add margin for better alignment
        },
      }
    );
  };

  const showToast = () => {
    setSubmitted(false);
    toast.custom(
      <div
        style={{
          position: "relative",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          color: "var(--color-grey-700)",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "16px" }}>
          Are you sure that you want to pay?
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => toast.dismiss()}
          >
            Dismiss
          </button>
          <button
            style={{
              marginLeft: "8px",
              padding: "8px 16px",
              backgroundColor: "#008000",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              toast.dismiss();
              handleAccept();
            }}
          >
            Accept
          </button>
        </div>
      </div>,
      {
        duration: 10000, // Optional: Set the duration as needed
        position: "top-center", // Change the toast position
        style: {
          margin: "20px", // Add margin for better alignment
        },
      }
    );
  };

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
                    {!submitted && (
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
                    )}
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
            {submitted && (
              <div style={{ color: "black" }}>
                {u_order?.dishes?.map((dish, index) => (
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
                        onClick={() => removeDishUpdate(index)}
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
            )}
            <p>
              Total price:<b>{" " + price.toFixed(2)}</b> PLN
            </p>
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
          {!submitted && (
            <div
              style={{
                position: "fixed",
                bottom: "75px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button
                type="submit"
                className="btn btn-success btn-lg"
                style={{ backgroundColor: "#008000", color: "white" }}
              >
                Submit the order
              </button>
              <p></p>
              <select
                {...register("selectedTable")}
                style={{ borderRadius: "10px" }}
              >
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
          {submitted &&
            u_order.dishes.length === 0 &&
            id !== "c11289ee-a8e7-4fcd-a83d-d5f95a5e9fe5" && (
              <div
                style={{
                  position: "fixed",
                  bottom: "110px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={showToast}
                  style={{
                    backgroundColor: "#008000",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  Confirm to pay
                </button>
              </div>
            )}
          {submitted && u_order.dishes.length > 0 && (
            <div
              style={{
                position: "fixed",
                bottom: "110px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button
                onClick={handleEdit}
                type="button"
                className="btn btn-success btn-lg"
                style={{
                  backgroundColor: "#008000",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                Replace Order
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
