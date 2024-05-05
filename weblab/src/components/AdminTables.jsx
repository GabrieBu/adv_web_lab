import { getTables } from "../services/db/staff/apiStaff";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loaders/Loader";
import { setStateTable } from "../services/db/staff/apiStaff";
import { useState } from "react";
import { useEffect } from "react";


// Define the styles directly in the component file
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',  // Ensure full vertical height
    width: '100%',       // Full width to support centering
    padding: '20px',     // Padding for some spacing from the browser edges
  },
 
  main: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',  // 5 columns
    gridTemplateRows: 'repeat(4, 1fr)',     // 4 rows
    gap: '10px',
    maxWidth: '960px',  // Max width for grid
    width: '100%',      // Responsive width
    justifyContent: 'center',  // Centering grid items horizontally
    alignItems: 'center',      // Centering grid items vertically
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    minHeight: '100px',  // Ensure all tables have the same minimum height
    backgroundColor: '#ff0000', // Default red, will be overridden by state
    color: 'white',
    fontWeight: 'bold',
    padding: '10px',  // Padding for the content inside tables
  },
  empty: {
    backgroundColor: 'green'  // Color for empty tables
  },
  booked: {
    backgroundColor: 'red'  // Color for booked tables
  }
};

function AdminTables() {
  const { data: tables, isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
  });

  const [tablesState, setTablesState] = useState([]);

  useEffect(() => {
    if (!isLoading && tables) {
      setTablesState(tables);
    }
  }, [isLoading, tables]);

  const handleCheckboxChange = async (tableId, currentState) => {
    const newState = !currentState;
    try {
      await setStateTable(tableId, newState);
      setTablesState(prevTables =>
        prevTables.map(table =>
          table.id_table === tableId ? { ...table, state: newState } : table
        )
      );
    } catch (error) {
      console.error('Error updating state in Supabase DB:', error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {tablesState.map(table => (
          <div key={table.id_table} style={{...styles.table, ...(table.state ? styles.empty : styles.booked)}}>
            <p>Table: {table.id_table}</p>
            <p>Status: {table.state ? "Empty" : "Booked"}</p>
            <input
              type="checkbox"
              checked={!table.state}
              onChange={() => handleCheckboxChange(table.id_table, table.state)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTables;