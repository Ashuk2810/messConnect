import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "../admin/Admin.css";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [showChangePassword, setShowChangePassword] = useState(false);

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const res = await api.get("/users/profile");

                console.log("Profile Response:", res.data);

                setProfile(res.data);

            } catch (err) {

                console.log("Profile Error:", err);

                setError("Unable to load profile");

            }

        };

        loadProfile();

    }, []);

    const handleSendOtp = async () => {

        setMessage("");
        setError("");

        if (!profile?.userCode) {

            setError(
                "User profile is still loading. Please try again."
            );

            return;
        }

        console.log(
            "USER CODE FROM PROFILE:",
            profile.userCode
        );

        try {

            await api.post("/users/forgot-password", {

                userCode: profile.userCode

            });

            setOtpSent(true);

            setMessage(
                "OTP sent successfully to your registered email."
            );

        } catch (err) {

            console.log("Send OTP Error:", err);

            console.log(
                "Backend Response:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to send OTP"
            );

        }

    };

    const handleVerifyOtp = async () => {

        setMessage("");
        setError("");

        if (!otp) {

            setError("Please enter OTP");

            return;
        }

        try {

            await api.post("/users/verify-otp", {

                userCode: profile.userCode,
                otp: otp

            });

            setOtpVerified(true);

            setMessage(
                "OTP verified successfully. You can now set a new password."
            );

        } catch (err) {

            console.log("OTP Verification Error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Invalid or expired OTP"
            );

        }

    };

    const handleResetPassword = async () => {

        setMessage("");
        setError("");

        if (!newPassword || !confirmPassword) {

            setError("Please enter both password fields");

            return;
        }

        if (newPassword !== confirmPassword) {

            setError("Passwords do not match");

            return;
        }

        try {

            await api.post("/users/reset-password", {

                userCode: profile.userCode,
                newPassword: newPassword

            });

            setMessage(
                "Password changed successfully."
            );

            setOtpSent(false);
            setOtpVerified(false);

            setOtp("");
            setNewPassword("");
            setConfirmPassword("");

            setShowChangePassword(false);

        } catch (err) {

            console.log("Reset Password Error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to change password"
            );

        }

    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>👤 MessConnect</h2>

                <Link to="/user/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/user/menu">
                    🍽 Today's Menu
                </Link>

                
                <Link to="/user/profile">
                    👤 Profile
                </Link>

                <Link to="/user/wallet">
                    💳 Wallet
                </Link>

                <Link to="/user/notifications">
                    🔔 Notifications
                </Link>

                <Link to="/user/feedback">
                    ⭐ Feedback
                </Link>

                <Link to="/login">
                    🚪 Logout
                </Link>

            </div>

            <div className="content">

                <h1>User Profile</h1>

                {message && (

                    <p style={{
                        color: "green",
                        fontWeight: "bold"
                    }}>
                        {message}
                    </p>

                )}

                {error && (

                    <p style={{
                        color: "red",
                        fontWeight: "bold"
                    }}>
                        {error}
                    </p>

                )}

                <div className="cards">

                    <div className="card">

                        <h2>Personal Information</h2>

                        <table className="foodTable">

                            <tbody>

                                <tr>
                                    <td>
                                        <b>Name</b>
                                    </td>

                                    <td>
                                        {profile?.fullName ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>User Code</b>
                                    </td>

                                    <td>
                                        {profile?.userCode ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>Email</b>
                                    </td>

                                    <td>
                                        {profile?.email ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>Mobile</b>
                                    </td>

                                    <td>
                                        {profile?.mobile ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>Role</b>
                                    </td>

                                    <td>
                                        {profile?.role ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>User Type</b>
                                    </td>

                                    <td>
                                        {profile?.userType ||
                                            "Not Available"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <b>Status</b>
                                    </td>

                                    <td>
                                        {profile?.status ||
                                            "Not Available"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                        <br />

                        <button
                            className="editBtn"
                            onClick={() => {

                                setShowChangePassword(
                                    !showChangePassword
                                );

                                setMessage("");
                                setError("");

                            }}
                        >
                            🔐 Change Password
                        </button>

                    </div>

                </div>

                {showChangePassword && (

                    <div className="cards">

                        <div className="card">

                            <h2>Change Password</h2>

                            {!otpSent && (

                                <div>

                                    <p>
                                        An OTP will be sent to your
                                        registered email address.
                                    </p>

                                    <button
                                        className="addBtn"
                                        onClick={handleSendOtp}
                                    >
                                        📧 Send OTP
                                    </button>

                                </div>

                            )}

                            {otpSent && !otpVerified && (

                                <div>

                                    <p>
                                        Enter the OTP sent to your
                                        registered email.
                                    </p>

                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                        maxLength="6"
                                    />

                                    <br />
                                    <br />

                                    <button
                                        className="addBtn"
                                        onClick={handleVerifyOtp}
                                    >
                                        Verify OTP
                                    </button>

                                    <br />
                                    <br />

                                    <button
                                        className="editBtn"
                                        onClick={handleSendOtp}
                                    >
                                        Resend OTP
                                    </button>

                                </div>

                            )}

                            {otpVerified && (

                                <div>

                                    <p style={{
                                        color: "green",
                                        fontWeight: "bold"
                                    }}>
                                        OTP Verified ✓
                                    </p>

                                    <input
                                        type="password"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <br />
                                    <br />

                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <br />
                                    <br />

                                    <button
                                        className="addBtn"
                                        onClick={
                                            handleResetPassword
                                        }
                                    >
                                        Change Password
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Profile;