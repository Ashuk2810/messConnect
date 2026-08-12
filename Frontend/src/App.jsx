import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import FoodManagement from "./pages/admin/FoodManagement";
import Users from "./pages/admin/Users";
import WalletManagement from "./pages/admin/WalletManagement";
import Staff from "./pages/admin/Staff";
import Orders from "./pages/admin/Orders";
import Reports from "./pages/admin/Reports";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import Refunds from "./pages/admin/Refunds";

// Staff
import DashboardStaff from "./pages/staff/Dashboard";
import Billing from "./pages/staff/Billing";
import StaffRefund from "./pages/staff/StaffRefund";
import BillingHistory from "./pages/staff/BillingHistory";

// User
import DashboardUser from "./pages/user/Dashboard";
import Menu from "./pages/user/Menu";
import MealHistory from "./pages/user/MealHistory";
import Profile from "./pages/user/Profile";
import Wallet from "./pages/user/Wallet";

import Notifications from "./pages/user/Notifications";
import Feedback from "./pages/user/Feedback";

// Protected Routes
import AdminRoute from "./routes/AdminRoute";
import StaffRoute from "./routes/StaffRoute";
import UserRoute from "./routes/UserRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/food"
                    element={
                        <AdminRoute>
                            <FoodManagement />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <Orders />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <Users />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/staff"
                    element={
                        <AdminRoute>
                            <Staff />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/wallet"
                    element={
                        <AdminRoute>
                            <WalletManagement />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <AdminRoute>
                            <Reports />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/feedback"
                    element={
                        <AdminRoute>
                            <FeedbackManagement />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/refunds"
                    element={
                        <AdminRoute>
                            <Refunds />
                        </AdminRoute>
                    }
                />

                {/* ================= STAFF ================= */}

                <Route
                    path="/staff/dashboard"
                    element={
                        <StaffRoute>
                            <DashboardStaff />
                        </StaffRoute>
                    }
                />

                <Route
                    path="/staff/billing"
                    element={
                        <StaffRoute>
                            <Billing />
                        </StaffRoute>
                    }
                />
                    <Route path="/staff/billing-history" element={<BillingHistory />}
/>
                <Route
                    path="/staff/refunds"
                    element={
                        <StaffRoute>
                            <StaffRefund />
                        </StaffRoute>
                    }
                />

                {/* ================= USER ================= */}

                <Route
                    path="/user/dashboard"
                    element={
                        <UserRoute>
                            <DashboardUser />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/menu"
                    element={
                        <UserRoute>
                            <Menu />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/history"
                    element={
                        <UserRoute>
                            <MealHistory />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/profile"
                    element={
                        <UserRoute>
                            <Profile />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/wallet"
                    element={
                        <UserRoute>
                            <Wallet />
                        </UserRoute>
                    }
                />

                
                <Route
                    path="/user/notifications"
                    element={
                        <UserRoute>
                            <Notifications />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/feedback"
                    element={
                        <UserRoute>
                            <Feedback />
                        </UserRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;