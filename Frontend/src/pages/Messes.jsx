import Navbar from "../components/Navbar";

function Messes() {

    const messes = [
        {
            id: 1,
            name: "Annapurna Mess",
            location: "Near CDAC Campus",
            price: "₹80 / Meal",
            rating: "4.5 ⭐"
        },
        {
            id: 2,
            name: "Food Paradise",
            location: "Sector 62",
            price: "₹100 / Meal",
            rating: "4.7 ⭐"
        },
        {
            id: 3,
            name: "South Indian Kitchen",
            location: "City Center",
            price: "₹90 / Meal",
            rating: "4.4 ⭐"
        }
    ];

    return (

        <>
            <Navbar />

            <div className="container">

                <h1>Available Messes</h1>

                {messes.map((mess) => (

                    <div className="card" key={mess.id}>

                        <h2>{mess.name}</h2>

                        <p><b>Location:</b> {mess.location}</p>

                        <p><b>Price:</b> {mess.price}</p>

                        <p><b>Rating:</b> {mess.rating}</p>

                        <button>Book Now</button>

                    </div>

                ))}

            </div>

        </>

    );
}

export default Messes;