import { useContext } from "react";
import { SubmittedContext } from "../contexts/SubmittedContext";

function useSubmitted() {
  const { submitted, setSubmitted } = useContext(SubmittedContext);

  return { submitted, setSubmitted };
}

export default useSubmitted;
