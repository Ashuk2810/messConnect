import { useState } from "react";
import Navbar from "../components/Navbar";

function BookMeal() {

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);

    const bookMeal = () => {

        if (!breakfast && !lunch && !dinner) {
            alert("Please select at least one meal");
            return;
        }

        alert("Meal Booked Successfully");

    };

    return (

        <>
            <Navbar />

            <div className="container">

                <div className="card">

                    <h2>Book Your Meal</h2>

                    <p>
                        <input
                            type="checkbox"
                            checked={breakfast}
                            onChange={() => setBreakfast(!breakfast)}
                        />
                        Breakfast
                    </p>

                    <p>
                        <input
                            type="checkbox"
                            checked={lunch}
                            onChange={() => setLunch(!lunch)}
                        />
                        Lunch
                    </p>

                    <p>
                        <input
                            type="checkbox"
                            checked={dinner}
                            onChange={() => setDinner(!dinner)}
                        />
                        Dinner
                    </p>

                    <br />

                    <button onClick={bookMeal}>
                        Confirm Booking
                    </button>

                </div>

            </div>

        </>

    );

}

export default BookMeal;