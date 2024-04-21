import { useEffect } from "react";

function useTitle(title) {
  useEffect(
    function () {
      return function () {
        document.title = `${title}`;
      };
    },
    [title]
  );
}

export default useTitle;
