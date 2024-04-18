import PropTypes from "prop-types";

import { useEffect } from "react";
import Loader from "../loaders/Loader";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

function ProtectedRouteUser({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useAuthUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching") {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

ProtectedRouteUser.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};

export default ProtectedRouteUser;
