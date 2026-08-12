import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>MessConnect</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/menu">Manage Menu</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/wallet">Wallet</Link>
      <Link to="/admin/bills">Bills</Link>
    </div>
  );
}

export default Sidebar;