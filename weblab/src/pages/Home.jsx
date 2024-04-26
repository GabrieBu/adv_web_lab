import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";
import DishItem from "../components/DishItem";
import { supabase } from "../services/db/supabase";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useOrder from "../hooks/useOrder";
import { Link } from "react-router-dom";

function Home() {
  const { order } = useOrder();
  useTitle("Home - Menu");
  const { data: dishes, isLoading: isLoadingDishes } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("food_drink").select("*");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    console.log(order);
  }, [order]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  if (isLoadingDishes) return <Loader />;

  return (
    <div>
      <ProfileBar />
      <div style={{ padding: "10px" }}>
        <nav className="navbar navbar-light bg-light justify-content-end">
          {showSearchBar && (
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search for a dish"
                aria-label="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </form>
          )}
          <button
            className="navbar-toggler"
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </button>
        </nav>
        <p></p>
        <p></p>
        <div>
          {dishes
            .filter((dish) => {
              if (searchTerm === "") {
                return dish;
              } else if (
                dish.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return dish;
              }
            })
            .map((dish) => (
              <DishItem key={dish.id_food_drink} dishId={dish.id_food_drink} />
            ))}
        </div>
        <Link
          to="/order"
          style={{ position: "fixed", bottom: "50px", right: "20px" }}
        >
          <button>View Current Order</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
