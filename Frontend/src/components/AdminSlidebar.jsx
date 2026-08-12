import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="sidebar">

      <img src={logo} alt="MessConnect" className="logo" />

<h2>MessConnect</h2>

      <Link to="/admin/dashboard">Dashboard</Link>

      <Link to="/admin/food">Food Management</Link>

      <Link to="/admin/wallet">Wallet Management</Link>

      <Link to="/admin/users">Users</Link>

      <Link to="/login">Logout</Link>

    </div>
  );
}

export default AdminSidebar;