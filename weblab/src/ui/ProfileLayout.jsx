import { useNavigate } from "react-router-dom";
import { logout } from "../services/db/authentication/apiAuth";
import { getUserLogged } from "../services/db/profile/apiProfile";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { useEffect } from "react";
import ProfileBar from "../components/ProfileBar";
import History from "../components/History";

function ProfileLayout() {
  const navigate = useNavigate();

  function userLogout() {
    navigate("/login");
    logout();
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserLogged(),
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <ProfileBar />
      <h1>
        Welcome {user.name} {user.surname}
      </h1>
      <h3>
        <b>Username: </b> {user.username}
      </h3>
      <h2>You have already earned {user.points}</h2>
      <h1>Past orders</h1>
      <History user_id={user.id} />
      <button onClick={() => userLogout()}>Logout</button>
    </div>
  );
}

export default ProfileLayout;
