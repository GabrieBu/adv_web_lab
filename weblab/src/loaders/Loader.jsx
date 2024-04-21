import { bouncy } from "ldrs";

bouncy.register();

// Default values shown

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full height of the viewport
      }}
    >
      <l-bouncy size="72" speed="1.75" color="black"></l-bouncy>
    </div>
  );
}

export default Loader;
