import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo.jpg";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        userCode: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [forgotMode, setForgotMode] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChange = (e) => {

        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/users/login", {
                userCode: login.userCode.trim(),
                password: login.password
            });

            console.log("LOGIN RESPONSE:", res.data);

            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("role", res.data.role);
            sessionStorage.setItem("userCode", res.data.userCode);
            sessionStorage.setItem("fullName", res.data.fullName);
            sessionStorage.setItem("userType", res.data.userType);

            alert("Login Successful");

            if (res.data.role === "ADMIN") {

                navigate("/admin/dashboard");

            }
            else if (res.data.role === "BILLING_STAFF") {

                navigate("/staff/dashboard");

            }
            else {

                navigate("/user/dashboard");

            }

        } catch (err) {

            console.log("LOGIN ERROR:", err);

            alert(
                err.response?.data?.message ||
                "Invalid User Code or Password"
            );

        }

    };

    const sendOtp = async () => {

        if (!login.userCode.trim()) {

            alert("Please enter your User Code");

            return;

        }

        try {

            await api.post("/users/forgot-password", {
                userCode: login.userCode.trim()
            });

            alert("OTP sent successfully to your registered email");

            setOtpSent(true);

        } catch (err) {

            console.log("SEND OTP ERROR:", err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to send OTP"
            );

        }

    };

    const verifyOtp = async () => {

        if (!otp.trim()) {

            alert("Please enter OTP");

            return;

        }

        try {

            await api.post("/users/verify-otp", {
                userCode: login.userCode.trim(),
                otp: otp.trim()
            });

            alert("OTP verified successfully");

            setOtpVerified(true);

        } catch (err) {

            console.log("VERIFY OTP ERROR:", err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Invalid or expired OTP"
            );

        }

    };

    const resetPassword = async () => {

        if (!newPassword.trim()) {

            alert("Please enter a new password");

            return;

        }

        try {

            await api.post("/users/reset-password", {
                userCode: login.userCode.trim(),
                newPassword: newPassword
            });

            alert("Password reset successfully. Please login again.");

            setForgotMode(false);
            setOtpSent(false);
            setOtpVerified(false);
            setOtp("");
            setNewPassword("");

            setLogin({
                userCode: "",
                password: ""
            });

        } catch (err) {

            console.log("RESET PASSWORD ERROR:", err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to reset password"
            );

        }

    };

    return (

        <div className="loginContainer">

            <div className="leftPanel">

                <img
                    src={logo}
                    alt="MessConnect Logo"
                    className="logo"
                />

                <h1>MessConnect</h1>

                <p>Smart Mess Management System</p>

            </div>

            <div className="rightPanel">

                <div className="loginCard">

                    {!forgotMode ? (

                        <>

                            <h2>Welcome Back 👋</h2>

                            <p>Login to continue</p>

                            <form onSubmit={handleLogin}>

                                <input
                                    type="text"
                                    name="userCode"
                                    placeholder="Enter User Code"
                                    value={login.userCode}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="passwordBox">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Enter Password"
                                        value={login.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <span
                                        className="eyeIcon"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? "🙈" : "👁"}
                                    </span>

                                </div>

                                <div className="options">

                                    

                                    <button
                                        type="button"
                                        onClick={() => setForgotMode(true)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            padding: 0,
                                            color: "#007bff",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Forgot Password?
                                    </button>

                                </div>

                                <button type="submit">
                                    Login
                                </button>

                            </form>

                            

                        </>

                    ) : (

                        <>

                            <h2>Forgot Password 🔐</h2>

                            <p>
                                Reset your password using OTP
                            </p>

                            <input
                                type="text"
                                placeholder="Enter User Code"
                                value={login.userCode}
                                onChange={(e) =>
                                    setLogin({
                                        ...login,
                                        userCode: e.target.value
                                    })
                                }
                                disabled={otpSent}
                            />

                            {!otpSent && (

                                <button
                                    type="button"
                                    onClick={sendOtp}
                                >
                                    Send OTP
                                </button>

                            )}

                            {otpSent && !otpVerified && (

                                <>

                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={verifyOtp}
                                    >
                                        Verify OTP
                                    </button>

                                </>

                            )}

                            {otpVerified && (

                                <>

                                    <input
                                        type="password"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={resetPassword}
                                    >
                                        Reset Password
                                    </button>

                                </>

                            )}

                            <br />

                            <button
                                type="button"
                                onClick={() => {

                                    setForgotMode(false);
                                    setOtpSent(false);
                                    setOtpVerified(false);
                                    setOtp("");
                                    setNewPassword("");

                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#007bff",
                                    cursor: "pointer"
                                }}
                            >
                                ← Back to Login
                            </button>

                        </>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Login;