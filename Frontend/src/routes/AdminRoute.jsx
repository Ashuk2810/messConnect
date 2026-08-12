import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AdminRoute;