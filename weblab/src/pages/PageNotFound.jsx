import useTitle from "../hooks/useTitle";

function PageNotFound() {
  useTitle("Page not found - 404");
  return <div>Page Not Found - Error 404</div>;
}

export default PageNotFound;
