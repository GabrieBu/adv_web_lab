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

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0); // for id_category
  const [selectedType, setSelectedType] = useState(0); // for id_type
  const [showFilter, setShowFilter] = useState(false);

  const filterNames = [
    "Filter by Category",
    "Main Course",
    "Desserts",
    "Drinks",
    "First Course",
    "Side Dishes",
  ];

  const typeFilters = ["Filter by Type", "Vegan", "Spicy", "Alcohol"];

  if (isLoadingDishes) return <Loader />;

  const handleFilterSelection = (index) => {
    setSelectedFilter(index);
    setSelectedType(0);
  };

  const handleTypeSelection = (index) => {
    setSelectedType(index);
    setSelectedFilter(0);
  };

  return (
    <div>
      <ProfileBar active_page="home" />
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
          <div style={{ display: "flex", alignItems: "center " }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {showFilter && (
            <><div style={{ width: "100%" }}>
              {filterNames.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterSelection(index)}
                  style={{
                    color: "black",
                    backgroundColor:
                      selectedFilter === index ? "lightgreen" : "lightgrey",
                    borderRadius: "10px",
                    padding: "0px 2px",
                    margin: "2px",
                    border:
                      selectedFilter === index
                        ? "1px solid green"
                        : "1px solid lightgray",
                  }}
                >
                  {filter}
                </button>
              ))}
               </div>
              <div style={{ width: "100%" }}>
              {typeFilters.map((type, index) => (
                <button
                  key={index}
                  onClick={() => handleTypeSelection(index)}
                  style={{
                    color: "black",
                    backgroundColor:
                      selectedType === index ? "lightblue" : "lightgrey",
                    borderRadius: "10px",
                    padding: "0px 2px",
                    margin: "2px",
                    border:
                      selectedType === index
                        ? "1px solid blue"
                        : "1px solid lightgray",
                  }}
                >
                  {type}
                </button>
              ))}
              </div>
            </>
          )}
        </div>
        <p></p>
        <div>
          {dishes
            ?.filter((dish) => {
              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              const matchesSearchTerm = dish.name
                .toLowerCase()
                .includes(lowerCaseSearchTerm);
              const matchesCategory =
                selectedFilter === 0 || dish.id_category === selectedFilter;
              const matchesType =
                selectedType === 0 || dish.id_type === selectedType;

              return (
                (searchTerm === "" &&
                  selectedFilter === 0 &&
                  selectedType === 0) ||
                (matchesSearchTerm && matchesCategory && matchesType)
              );
            })
            .map((dish) => (
              <DishItem key={dish.id_food_drink} dishId={dish.id_food_drink} />
            ))}
        </div>
        <Link
          to="/order"
          style={{ position: "fixed", bottom: "70px", left: "50%", transform: "translateX(-50%)" }}
        >
          <button className="btn btn-success" style={{ backgroundColor: "#008000", color: "white" ,borderRadius: "10px",}}>View Current Order</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
