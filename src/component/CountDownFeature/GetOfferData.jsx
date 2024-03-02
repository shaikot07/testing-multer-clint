import axios from 'axios';
import { useEffect, useState } from 'react';
import ShowCountWodn from './ShowCountWodn';

const GetOfferData = () => {
    const [offerData, setOfferData] = useState(null);
    // console.log(offerData);

    useEffect(() => {
        axios.get("http://localhost:5000/get-offer")
            .then(response => {
                setOfferData(response.data);
            })
            .catch(error => {
                console.error("Error fetching offer data:", error);
            });
    }, []);

    console.log("Received offerData:", offerData);

    if (!offerData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ShowCountWodn offerData={offerData} />
        </div>
    );

};

export default GetOfferData;