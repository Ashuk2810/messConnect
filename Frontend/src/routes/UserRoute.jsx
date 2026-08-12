import { Navigate } from "react-router-dom";

function UserRoute({ children }) {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "USER") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default UserRoute;