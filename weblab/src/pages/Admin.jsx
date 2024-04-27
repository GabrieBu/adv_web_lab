import AdminLayout from "../ui/AdminLayout";
import KitchenLayout from "../ui/KitchenLayout";
import WaiterLayout from "../ui/WaiterLayout";
import { useAuthAdmin } from "../hooks/useAuthAdmin";

function Admin() {
  const { role, id } = useAuthAdmin();
  if (role === 1) return <KitchenLayout />;
  if (role === 2) return <WaiterLayout id={id} />;
  if (role == 3) return <AdminLayout />;
}

export default Admin;
