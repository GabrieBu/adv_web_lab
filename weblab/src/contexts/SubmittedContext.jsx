import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SubmittedContext = createContext();

export const SubmittedProvider = ({ children }) => {
  // Load submitted from localStorage or initialize with false
  const [submitted, setSubmitted] = useState(() => {
    const storedSubmitted = localStorage.getItem("submitted");
    return storedSubmitted ? JSON.parse(storedSubmitted) : false;
  });

  // Save submitted to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("submitted", JSON.stringify(submitted));
  }, [submitted]);

  return (
    <SubmittedContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </SubmittedContext.Provider>
  );
};

SubmittedProvider.propTypes = {
  children: PropTypes.node.isRequired, // specify that children can be any renderable React node
};
