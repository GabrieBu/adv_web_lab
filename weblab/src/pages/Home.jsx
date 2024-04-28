import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";
import DishItem from "../components/DishItem";
import { supabase } from "../services/db/supabase";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
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

  // Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  let filterNames = ["All", "Main Course", "Desserts", "Drinks", "First Course", "Side Dishes"]


  if (isLoadingDishes) return <Loader />;

  return (
    <div>
      <ProfileBar />
      <div style={{ padding: "10px" }}>
        <nav className="navbar navbar-light bg-light">
          <div style={{ position: "flex" }}>
            <button
              className="navbar-toggler"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FontAwesomeIcon icon={faFilter} size="2x" />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center "}}>
              {showSearchBar && (
              <form className="form-inline">
                <input
                  className="form-control me-md-2"
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
          </div>
        </nav>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
          {showFilter && (
              filterNames.map((filter, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedFilter(index)}
                    style={{
                      color: "black",
                      backgroundColor: selectedFilter === index ? "lightgreen" : "white",
                      borderRadius: "10px",
                      padding: "0px 2px",
                      margin: "2px",
                      border: selectedFilter === index ? "1px solid green" : "1px solid lightgray"
                    }}
                  >
                    {filter}
                  </button>
                )
              })
              )}
        </div>
        <p></p>
        <div>
          {dishes
            .filter((dish) => {
              console.log(dish.id_category, selectedFilter);
              if (searchTerm === ""
                && selectedFilter === 0
              ) {
                return dish;
              } else if (dish.name.toLowerCase().includes(searchTerm.toLowerCase())
                && selectedFilter === 0
              ) {
                return dish;
              } else if (
                dish.name.toLowerCase().includes(searchTerm.toLowerCase())
                && dish.id_category === selectedFilter
              ) {
                return dish;
              }
            })
            .map((dish) => (
              <DishItem key={dish.id_food_drink} dishId={dish.id_food_drink}/>
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
