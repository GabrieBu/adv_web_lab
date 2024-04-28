// eslint-disable-next-line react/prop-types
function History() {
  /*const { isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersUser(user_id),
  });*/

  return (
    <div>
      Orders History
      {/*orders.map((order, index) => (
        <div key={index}>
          <p>{order.created_at}</p>
        </div>
      ))*/}
    </div>
  );
}

export default History;
