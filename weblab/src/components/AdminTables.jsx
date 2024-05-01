import { getTables } from "../services/db/staff/apiStaff";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import Loader from "../loaders/Loader";
import { setStateTable } from "../services/db/staff/apiStaff";
import { QueryCache } from "@tanstack/react-query";

function AdminTables() {
  const { data: tables, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const [mutate] = useMutation(setStateTable);

  const handleCheckboxChange = useCallback(
    async (tableId, currentState) => {
      const newState = !currentState; // Toggle the state
      await mutate({ id_table: tableId, value: newState });
      QueryCache.refetchQueries("tables");
    },
    [mutate]
  );

  if (isLoadingSelect) return <Loader />;

  return (
    <div>
      {tables.map((table) => (
        <div key={table.id_table}>
          <p>Table: {table.id_table}</p>
          <p>state: {table.state ? "Empty" : "Booked"}</p>
          <input
            type="checkbox"
            checked={!table.state}
            onChange={() => handleCheckboxChange(table.id_table, table.state)}
          />
        </div>
      ))}
    </div>
  );
}

export default AdminTables;
