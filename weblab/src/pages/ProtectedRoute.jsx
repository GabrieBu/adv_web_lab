import PropTypes from "prop-types";

import { useEffect } from "react";
import Loader from "../loaders/Loader";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};

export default ProtectedRoute;
