function OrderReview(){
  return(
    <body style="margin: 0; font-family: Arial, sans-serif">
    {/* <!-- Back Arrow --> */}
    <div
      style="
        position: absolute;
        top: 16px;
        left: 16px;
        font-size: 24px;
        cursor: pointer;
      "
    >
      &larr;
    </div>

    {/* <!-- Pizza Image --> */}
    <div style="text-align: center; padding-top: 50px">
      {/* <!-- added padding to make space for the back button --> */}
      <img
        src="family_pizza.jpg"
        alt="Pizza"
        style="width: 80%; max-width: 300px"
      />
      {/* <!-- Decreased size --> */}
    </div>

    {/* <!-- Pizza Name and Price --> */}
    <div style="padding: 16px">
      <div style="font-size: 24px; font-weight: bold">
        Pizza Double Pepperoni
      </div>
      <div style="font-size: 20px; color: green">
        PLN 50
        <span style="font-size: 16px; color: grey">Earn 5 points</span>
      </div>
      {/* <!-- Ingredients --> */}
      <div style="color: grey">Pepperoni, ser mozzarella, sos pomidorowy</div>

      {/* <!-- Add a Note Section --> */}
      <textarea
        placeholder="Add a note here"
        style="
          width: 100%;
          margin-top: 8px;
          border: 1px solid #ccc;
          padding: 10px;
        "
      ></textarea>

      {/* <!-- Quantity Controls --> */}
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div
          style="
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #f2f2f2;
            cursor: pointer;
          "
        >
          -
        </div>
        <div style="margin: 0 15px">1</div>
        <div
          style="
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #f2f2f2;
            cursor: pointer;
          "
        >
          +
        </div>
        {/* <!-- Add to Cart Button --> */}
        <button
          style="
            background-color: rgb(8, 99, 29);
            color: white;
            border: none;
            padding: 15px 30px;
            cursor: pointer;
            margin-left: auto;
            border-radius: 20px;
          "
          
        >
          Add to Cart
        </button>
      </div>
    </div>
  </body>
  )
}