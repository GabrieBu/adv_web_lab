import Loader from "../loaders/Loader";

import { useAuthUser } from "../hooks/useAuthUser";
import History from "./History";

function UserComponent() {
  const { user_auth, user, isLoading } = useAuthUser();

  if (isLoading) return <Loader />;
  return (
    <div>
      <h1>
        Welcome {user_auth.name} {user_auth.surname}
      </h1>
      <h3>
        <b>Username: {user_auth.username}</b>
      </h3>
      <h2>You have already earned {user_auth.points} points</h2>
      <h3>
        Huakang maybe show the email just if the user clcik something like
        personal info
        <p></p>
        {user.email}
      </h3>
      <h1>Past orders</h1>
      <History user_id={user.id} />
    </div>
  );
}

export default UserComponent;
