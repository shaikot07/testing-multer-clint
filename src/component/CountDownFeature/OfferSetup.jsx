import { useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";

const OfferSetup = () => {
    const [formData, setFormData] = useState({
        offPercentage: " ",
        startDate: " ",
        endDate: " ",
        offerDescription:" "
        // Add other fields here 
    });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const finalData = { ...formData };
        console.log(finalData);
        // Send the combined data to your backend endpoint
        const backendResponse = await axios.post('http://localhost:5000/post-offer', finalData);
        console.log(backendResponse);
        if (backendResponse) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `upload Resource successfully `,
                showConfirmButton: false,
                timer: 1500
            })

            console.log('Data sent to backend successfully:', backendResponse.data);
        }
    }
    return (
        <div>
            <div>
                <form
                    onSubmit={handleSubmit} >
                    <div className="flex justify-between gap-4">
                        {/*Start Date */}
                        <div className=" mt-6">
                            <label className="text-xl">Start Date</label><br />
                            <input type="date"
                                placeholder="Type here Start date"
                                required
                                name='startDate'
                                className="py-2 bg-transparent transition-colors peer w-full pl-3 font-poppins text-sm border-none outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <hr className="border-t border-first" />
                        </div>
                        {/*End Date */}
                        <div className=" mt-6">
                            <label className="text-xl">End Date</label><br />
                            <input type="date"
                                placeholder="Type here end date"
                                required
                                name='endDate'
                                className="py-2 bg-transparent transition-colors peer w-full pl-3 font-poppins text-sm border-none outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <hr className="border-t border-first" />
                        </div>
                    </div>
                    <div className='flex justify-between gap-4'>
                        {/*Regular price */}
                        <div className="mt-6">
                            <label className="text-xl">Offer Description</label><br />
                            <textarea
                                placeholder="Enter Offer Description"
                                required
                                name='offerDescription'  // Assuming 'offerDescription' is the correct name for the description field
                                className="py-2 bg-transparent transition-colors peer w-full pl-3 font-poppins text-sm border-none outline-none focus:ring-0"
                                onChange={handleChange}
                            ></textarea>
                            <hr className="border-t border-first" />
                        </div>
                        {/*Offer  Percentage */}
                        <div className=" mt-6">
                            <label className="text-xl">Off Percentage</label><br />
                            <input type="number"
                                placeholder="Offer price"
                                required
                                name='offPercentage'
                                className="py-2 bg-transparent transition-colors peer w-full pl-3 font-poppins text-sm border-none outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <hr className="border-t border-first" />
                        </div>

                    </div>

                    <button
                        className="btn-style w-full mt-6"
                        type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OfferSetup;