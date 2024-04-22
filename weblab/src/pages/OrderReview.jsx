export default function OrderReview() {
  return (
    <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
      {/* <!-- Back Arrow --> */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        &larr;
      </div>

      {/* <!-- Pizza Image --> */}
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        {/* <!-- added padding to make space for the back button --> */}
        <img
          src="../../public/family.jpeg"
          alt="Pizza"
          style={{ width: "80%", maxWidth: "300px" }}
        />
        {/* <!-- Decreased size --> */}
      </div>

      {/* <!-- Pizza Name and Price --> */}
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Pizza Double Pepperoni
        </div>
        <div style={{ fontSize: "20px", color: "green" }}>
          PLN 50
          <span style={{ fontSize: "16px", color: "grey" }}>Earn 5 points</span>
        </div>
        {/* <!-- Ingredients --> */}
        <div style={{ color: "grey" }}>
          Pepperoni, ser mozzarella, sos pomidorowy
        </div>

        {/* <!-- Add a Note Section --> */}
        <textarea
          placeholder="Add a note here"
          style={{
            width: "100%",
            marginTop: "8px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        ></textarea>

        {/* <!-- Quantity Controls --> */}
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              lineHeight: "50px",
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              cursor: "pointer",
            }}
          >
            -
          </div>
          <div style={{ margin: "0 15px" }}>1</div>
          <div
            style={{
              width: "50px",
              height: "50px",
              lineHeight: "50px",
              textAlign: "center",
              backgroundColor: "#f2f2f2",
              cursor: "pointer",
            }}
          >
            +
          </div>
          {/* <!-- Add to Cart Button --> */}
          <button
            style={{
              backgroundColor: "rgb(8, 99, 29)",
              color: "white",
              border: "none",
              padding: "15px 30px",
              cursor: "pointer",
              marginLeft: "auto",
              borderRadius: "20px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </body>
  );
}
