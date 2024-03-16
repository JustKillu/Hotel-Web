import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import NavBarMain from '../components/NavBarMain.jsx';

const HotelRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/rooms')
            .then(response => {
                setRooms(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    const handleReviewChange = (roomId, event) => {
        setReviews({
            ...reviews,
            [roomId]: event.target.value
        });
    };

    const handleReviewSubmit = (roomId) => {
        axios.post(`http://localhost:3001/rooms/${roomId}/reviews`, { text: reviews[roomId] })
        .then(response => {
            console.log('Review submitted: ', response.data);
            setError(null); // clear any previous error
        })
        .catch(error => {
            console.error('Error submitting review: ', error);
            console.error('Error response: ', error.response);
            setError('Error submitting review'); // set the error state
        });
    
    };

    if (loading) return "Loading...";

    return (
        <div>
        <div  className='mb-24'>
        <NavBarMain/>  
        </div>
        <div className="p-4">
            {rooms.map(room => {
                let imgSrc = '';
                if (room.img && room.img.data && room.img.data.data) {
                    imgSrc = `data:${room.img.contentType};base64,${Buffer.from(room.img.data.data).toString('base64')}`;
                }

                return (
                    <div key={room._id} className="mb-4 p-4 border rounded">
                        <h2 className="text-xl font-bold">{room.name}</h2>
                        <p>{room.description}</p>
                        <p>{room.comodidades}</p>
                        <p>{room.tarifas}</p>
                        <p>{room.reviews}</p>
                        <p>{room.evaluacion}</p>
                        <img src={imgSrc} alt="" />
                        <textarea value={reviews[room._id] || ''} onChange={(event) => handleReviewChange(room._id, event)} className="mt-2 p-2 border rounded w-full" placeholder="Leave a review" />
                        <button onClick={() => handleReviewSubmit(room._id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit Review</button>
                    </div>
                );
            })}
            {error && <p>{error}</p>} {/* show the error message if there is an error */}
        </div>
        </div>
    );
};

export default HotelRooms;
