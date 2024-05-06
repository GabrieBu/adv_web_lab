import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { getStaff } from "../services/db/staff/apiStaff";
import { updateOrderStaff } from "../services/db/staff/apiStaff";
import { getManage } from "../services/db/staff/apiStaff";

function Manage() {
  const { isLoading, data } = useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });

  const { isLoading: isLoadingManage, data: manageData } = useQuery({
    queryKey: ["manage"],
    queryFn: getManage,
  });

  const [assignedStaff, setAssignedStaff] = useState([]);

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "orange", // A deep blue shade
      color: "white",
      padding: "15px 10px",
      border: "1px solid #dee2e6",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    td: {
      textAlign: "left",
      padding: "12px 10px",
      border: "1px solid #dee2e6",
      backgroundColor: "white",
    },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      borderColor: "#ced4da",
      backgroundColor: "#fff",
      cursor: "pointer",
    },
    option: {
      padding: "10px",
    },
  };

  useEffect(() => {
    if (!isLoadingManage && manageData) {
      const initialAssignedStaff = [];

      manageData.forEach((item) => {
        initialAssignedStaff.push({
          orderId: item.id_order,
          staffId: item.id_staff,
        });
      });

      setAssignedStaff(initialAssignedStaff);
    }
  }, [isLoadingManage, manageData]);

  const handleStaffAssignment = async (orderId, staffId) => {
    const staffIndex = assignedStaff.findIndex(
      (assignment) =>
        assignment.orderId === orderId && assignment.staffId === staffId
    );

    if (staffIndex !== -1) {
      const updatedStaffAssignments = [...assignedStaff];
      updatedStaffAssignments.splice(staffIndex, 1);
      setAssignedStaff(updatedStaffAssignments);
      await updateOrderStaff(orderId, staffId, false);
    } else {
      setAssignedStaff([...assignedStaff, { orderId, staffId }]);
      await updateOrderStaff(orderId, staffId, true);
    }
  };

  const isStaffAssigned = (orderId, staffId) => {
    return assignedStaff.some(
      (assignment) =>
        assignment.orderId === orderId && assignment.staffId === staffId
    );
  };

  if (isLoading || isLoadingManage) return <Loader />;

  return (
    <div className="order-staff-assignment">
      <table className="table table-bordered" style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order ID</th>
            <th style={styles.th}>Cook(s)</th>
            <th style={styles.th}>Waiter(s)</th>
          </tr>
        </thead>
        <tbody>
          {data?.ordersData.map((order) => (
            <tr key={order.id_order}>
              <td>{order.id_order}</td>
              <td>
                <select
                  multiple
                  value={assignedStaff[order.id_order]?.cook || []}
                  onChange={(e) =>
                    handleStaffAssignment(order.id_order, e.target.value)
                  }
                >
                  {data?.cookersData.map((cook) => (
                    <option
                      key={cook.id}
                      value={cook.id}
                      style={{
                        color: isStaffAssigned(order.id_order, cook.id)
                          ? "green"
                          : "inherit",
                      }}
                    >
                      {cook.name + " "} {cook.surname}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  multiple
                  value={assignedStaff[order.id_order]?.waiter || []}
                  onChange={(e) =>
                    handleStaffAssignment(order.id_order, e.target.value)
                  }
                >
                  {data?.waitersData.map((waiter) => (
                    <option
                      key={waiter.id}
                      value={waiter.id}
                      style={{
                        color: isStaffAssigned(order.id_order, waiter.id)
                          ? "green"
                          : "inherit",
                      }}
                    >
                      {waiter.name + " "} {waiter.surname}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Manage;
