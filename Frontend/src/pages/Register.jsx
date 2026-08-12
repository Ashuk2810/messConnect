import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        mobile: "",
        userType: "HOSTELLER",
        role: "USER"
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/users/register", user);

            alert(
                "Registration Successful!\n\n" +
                "User Code : " + res.data.userCode +
                "\nTemporary Password : " + res.data.temporarayPassword
            );

            navigate("/login");

        } catch (err) {

            console.log(err);

            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Registration Failed");
            }

        }

    };

    return (

        <div className="registerContainer">

            <h2>Register New User</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={user.mobile}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <label>User Type</label>

                <br />

                <select
                    name="userType"
                    value={user.userType}
                    onChange={handleChange}
                >
                    <option value="HOSTELLER">Hosteller</option>
                    <option value="DAY_SCHOLAR">Day Scholar</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STAFF">Staff</option>
                </select>

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

        </div>

    );

}

export default Register;