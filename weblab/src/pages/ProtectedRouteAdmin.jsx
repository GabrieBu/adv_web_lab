import PropTypes from "prop-types";
import { useEffect } from "react";
import Loader from "../loaders/Loader";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { useNavigate } from "react-router-dom";

function ProtectedRouteAdmin({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useAuthAdmin();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching") {
        navigate("/loginadmin");
      }
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

ProtectedRouteAdmin.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};

export default ProtectedRouteAdmin;
