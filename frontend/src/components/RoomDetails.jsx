import React from 'react';
import { Buffer } from 'buffer';

const RoomDetails = ({ room, reviews, onReviewChange, onReviewSubmit }) => {
    let imgSrc = '';
    if (room.img && room.img.data && room.img.data.data) {
        imgSrc = `data:${room.img.contentType};base64,${Buffer.from(room.img.data.data).toString('base64')}`;
    }

    return (
        <div className="fixed inset-0 bg-white p-6 overflow-auto">
            <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
            <p className="mb-2">{room.description}</p>
            <p className="mb-2">{room.comodidades}</p>
            <p className="mb-2">{room.tarifas}</p>
            <p className="mb-2">{room.reviews}</p>
            <p className="mb-2">{room.evaluacion}</p>
            <p className="mb-2">{room.espacio}</p>
            <img src={imgSrc} alt="" className="w-64 h-64 object-cover mb-4" loading="lazy" />
            <textarea value={reviews[room._id] || ''} onChange={(event) => onReviewChange(room._id, event)} className="w-full p-2 border rounded mb-2" placeholder="Leave a review" />
            <button onClick={() => onReviewSubmit(room._id)} className="w-full py-2 bg-blue-500 text-light-text dark:text-dark-text  rounded">Submit Review</button>
        </div>
    );
};

export default RoomDetails;
