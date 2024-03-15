import { getUserName } from "../services/db/authentication/apiAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";

function Home() {
  const { data, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["user"],
    queryFn: getUserName,
  });

  if (isLoadingSelect) return <Loader />;

  const user = data ?? [];

  return (
    <div className="header">
      {user.map((item, i) => (
        <h1 key={i}>{item.name}</h1>
      ))}
    </div>
  );
}

export default Home;
