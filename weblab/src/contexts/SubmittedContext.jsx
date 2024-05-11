import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SubmittedContext = createContext();

export const SubmittedProvider = ({ children }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SubmittedContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </SubmittedContext.Provider>
  );
};

SubmittedProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};

export const useSubmitted = () => useContext(SubmittedContext);
