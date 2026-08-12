import { useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {

    const [user, setUser] = useState({
        name: "Sahil",
        email: "sahil@gmail.com",
        phone: "9876543210"
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const saveProfile = () => {
        alert("Profile Updated Successfully");
    };

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>My Profile</h2>

                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />

                    <br /><br />

                    <button onClick={saveProfile}>
                        Save Changes
                    </button>

                </div>

            </div>
        </>
    );
}

export default Profile;