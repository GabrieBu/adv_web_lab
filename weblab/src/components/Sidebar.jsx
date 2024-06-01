// import PropTypes from "prop-types";

// //text orange does not work!!

// function Sidebar({ onSetTab, tab }) {
//   return (
//     <div className="bg-light border-right" id="sidebar">
//       <div className="list-group list-group-flush">
//         <button
//           onClick={() => onSetTab(0)}
//           className={`list-group-item list-group-item-action bg-light ${
//             tab === 0 ? "text-orange" : ""
//           }`}
//         >
//           Orders
//         </button>
//         <button
//           onClick={() => onSetTab(1)}
//           className={`list-group-item list-group-item-action bg-light ${
//             tab === 1 ? "text-orange" : ""
//           }`}
//         >
//           Payments
//         </button>
//         <button
//           onClick={() => onSetTab(2)}
//           className={`list-group-item list-group-item-action bg-light ${
//             tab === 2 ? "text-orange" : ""
//           }`}
//         >
//           Manage
//         </button>
//         <button
//           onClick={() => onSetTab(3)}
//           className={`list-group-item list-group-item-action bg-light ${
//             tab === 3 ? "text-orange" : ""
//           }`}
//         >
//           Charts
//         </button>
//         <button
//           onClick={() => onSetTab(4)}
//           className={`list-group-item list-group-item-action bg-light ${
//             tab === 4 ? "text-orange" : ""
//           }`}
//         >
//           Table Map
//         </button>
//       </div>
//     </div>
//   );
// }

// Sidebar.propTypes = {
//   onSetTab: PropTypes.func.isRequired,
//   tab: PropTypes.number.isRequired,
// };

// export default Sidebar;
import PropTypes from "prop-types";

function Sidebar({ onSetTab, tab }) {
  // CSS in JS Styles
  const styles = {
    box: {
      padding: "10px 15px",
      cursor: "pointer",
      border: "none", // Borders made invisible
      margin: "5px 0", // Space between boxes
      backgroundColor: "transparent",
      textAlign: "left",
      width: "100%",
      color: "#333",
      transition: "background-color 0.3s", // Smooth transition for background color change
    },
    active: {
      backgroundColor: "orange", // Green background when active
      color: "white",
    },
  };

  // Define the navigation labels
  const labels = ["Orders", "Payments", "Manage", "Charts", "Table Map"];

  return (
    <div className="bg-light border-right" id="sidebar">
      <div className="list-group list-group-flush">
        {labels.map((name, index) => (
          <div
            key={index}
            id={name}
            style={{
              ...styles.box,
              ...(tab === index ? styles.active : {}),
            }}
            onClick={() => onSetTab(index)}
            className="list-group-item list-group-item-action"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onSetTab: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
};

export default Sidebar;
