import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { getOrdersPreparing } from "../services/db/staff/apiStaff";
import ManageOrder from "./ManageOrder";

function Manage() {
  const { isLoading, data } = useQuery({
    queryKey: ["order"],
    queryFn: getOrdersPreparing,
  });

  if (isLoading) return <Loader />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          flex: "1",
          width: "50%",
          marginRight: "20px", // Spacing from the right
        }}
      >
        <ManageOrder type="Ordered" data={data} />
      </div>

      <div
        style={{
          flex: "1",
          marginLeft: "20px", // Spacing from the left
          width: "50%",
        }}
      >
        <ManageOrder type="Preparing" data={data} />
      </div>
    </div>
  );
}

export default Manage;
