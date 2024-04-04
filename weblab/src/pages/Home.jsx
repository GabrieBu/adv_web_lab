import { getUserName } from "../services/db/authentication/apiAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import ProfileBar from "../components/ProfileBar";

function Home() {
  const { data, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["user"],
    queryFn: getUserName,
  });

  if (isLoadingSelect) return <Loader />;

  const user = data ?? [];

  return (
    <div>
      <ProfileBar />
      <div className="header d-flex flex-column justify-content-center align-items-center vh-100">
        {user.map((item, i) => (
          <h1 className="text-center" key={i}>Welcome {item.name}</h1>
        ))}
        <button className="btn btn-primary">Let's go to the meal</button>
      </div>
    </div>
  );
}

export default Home;
