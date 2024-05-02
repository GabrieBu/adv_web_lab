import { getTables } from "../services/db/staff/apiStaff";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { setStateTable } from "../services/db/staff/apiStaff";
import { useState } from "react";
import { useEffect } from "react";

function AdminTables() {
  const { data: tables, isLoading: isLoadingSelect } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const [tables_state, setTables] = useState(tables);

  useEffect(() => {
    if (!isLoadingSelect && tables) {
      setTables(tables);
    }
  }, [isLoadingSelect, tables]);

  const fetchTables = async () => {
    try {
      const tablesData = await getTables();
      setTables(tablesData);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleCheckboxChange = async (tableId, currentState) => {
    const newState = !currentState;

    try {
      await setStateTable(tableId, newState);
      setTables((prevTables) =>
        prevTables?.map((table) =>
          table.id_table === tableId ? { ...table, state: newState } : table
        )
      );
    } catch (error) {
      console.error("Error updating state in Supabase DB:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }),
    [fetchTables, tables_state];

  if (isLoadingSelect) return <Loader />;

  return (
    <div>
      {tables_state?.map((table) => (
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
