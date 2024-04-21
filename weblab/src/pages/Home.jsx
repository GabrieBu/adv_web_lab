import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";
import DishItem from "../components/DishItem";
import { supabase } from "../services/db/supabase";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Home() {
  useTitle("Home - Menu");
  const { data: dishes, isLoading: isLoadingDishes } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("food_drink").select("*");
      if (error) throw error;
      return data;
    },
  });

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
              }} />
            </form>
          )}
          <button 
            className="navbar-toggler"
            onClick={() => setShowSearchBar(!showSearchBar)}>
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
              }
              else if (dish.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return dish;
              }
            })
            .map((dish) => (
              <DishItem key={dish.id_food_drink} dishId={dish.id_food_drink} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

// {dishes.map((item, i) => (
//   <DishItem key={i} dishId={item.id_food_drink} />


export default Home;
