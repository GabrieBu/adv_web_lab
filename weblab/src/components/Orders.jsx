function Orders() {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Order Time</th>
          <th>Table ID</th>
          <th>Amount</th>
          <th>Cook Status</th>
          <th>Waiter Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Example data rows */}
        <tr>
          <td>Pasta</td>
          <td>10:00 AM</td>
          <td>Table 1</td>
          <td>$10.99</td>
          <td>In progress</td>
          <td>Ready for serving</td>
        </tr>
        <tr>
          <td>Pizza</td>
          <td>10:30 AM</td>
          <td>Table 2</td>
          <td>$15.99</td>
          <td>Ready</td>
          <td>Being served</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
}

export default Orders;
