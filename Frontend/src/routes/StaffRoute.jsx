import { Navigate } from "react-router-dom";

function StaffRoute({ children }) {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "BILLING_STAFF") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default StaffRoute;