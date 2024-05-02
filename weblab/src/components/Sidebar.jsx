import PropTypes from "prop-types";

//text orange does not work!!

function Sidebar({ onSetTab, tab }) {
  return (
    <div className="bg-light border-right" id="sidebar">
      <div className="list-group list-group-flush">
        <button
          onClick={() => onSetTab(0)}
          className={`list-group-item list-group-item-action bg-light ${
            tab === 0 ? "text-orange" : ""
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => onSetTab(1)}
          className={`list-group-item list-group-item-action bg-light ${
            tab === 1 ? "text-orange" : ""
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => onSetTab(2)}
          className={`list-group-item list-group-item-action bg-light ${
            tab === 2 ? "text-orange" : ""
          }`}
        >
          Manage
        </button>
        <button
          onClick={() => onSetTab(3)}
          className={`list-group-item list-group-item-action bg-light ${
            tab === 3 ? "text-orange" : ""
          }`}
        >
          Charts
        </button>
        <button
          onClick={() => onSetTab(4)}
          className={`list-group-item list-group-item-action bg-light ${
            tab === 4 ? "text-orange" : ""
          }`}
        >
          Table Map
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onSetTab: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
};

export default Sidebar;
