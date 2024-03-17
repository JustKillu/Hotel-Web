import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import NavBarMain from '../components/NavBarMain.jsx';
import { motion } from "framer-motion";
import { Pagination } from 'react-bootstrap'; 

const HotelRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState({});
    const [error, setError] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomReviews, setRoomReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3; // Número de reseñas por página

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
        const user = localStorage.getItem('user');

        axios.post(`http://localhost:3001/rooms/${roomId}/reviews`, { text: reviews[roomId], user: user })
            .then(response => {
                console.log('Review enviada: ', response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Error al enviar review: ', error);
                console.error('Error respuesta: ', error.response);
                setError('Error enviando la review');
            });
    };

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        axios.get(`http://localhost:3001/rooms/${room._id}/reviews`)
            .then(response => {
                setRoomReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews: ', error);
            });
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = roomReviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return "Cargando...";

    return (
        <div className="bg-white min-h-screen text-black pt-12">
            <NavBarMain/>
            <div className="container mx-auto px-4 ">
                <div className="grid grid-cols-3 gap-4">
                    {rooms.map(room => {
                        let imgSrc = '';
                        if (room.img && room.img.data && room.img.data.data) {
                            imgSrc = `data:${room.img.contentType};base64,${Buffer.from(room.img.data.data).toString('base64')}`;
                        }
                        return (
                            <motion.div 
                                key={room._id} 
                                className="mb-8 bg-white mt-10 shadow rounded p-6 border-2 border-transparent cursor-pointer transform transition-all duration-200 hover:border-blue-500 hover:scale-105" 
                                onClick={() => handleRoomSelect(room)}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
                                <img src={imgSrc} alt="" className="w-64 h-64 object-cover mb-4" loading="lazy" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {selectedRoom && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded flex">
            <img src={`data:${selectedRoom.img.contentType};base64,${Buffer.from(selectedRoom.img.data.data).toString('base64')}`} alt="" className="w-64 h-64 object-cover mb-4" loading="lazy" />
            <div className="ml-4">
                <h2 className="text-2xl font-semibold mb-2">{selectedRoom.name}</h2>
                <p className="mb-2"><strong>Descripción:</strong> {selectedRoom.description}</p>
                <p className="mb-2"><strong>Comodidades:</strong> {selectedRoom.comodidades}</p>
                <p className="mb-2"><strong>Tarifas:</strong> {selectedRoom.tarifas}</p>
                <p className="mb-2"><strong>Evaluación:</strong> {selectedRoom.evaluacion}</p>
                <p className="mb-2"><strong>Reseñas:</strong></p>
                <div className="border p-2 mb-2 rounded">
                    {currentReviews.length > 0 ? currentReviews.map((review, index) => (
                        <div key={index} className="border-b last:border-b-0 p-2">
                            <p><strong>Usuario:</strong> {review.user}</p>
                            <p><strong>Reseña:</strong> {review.text}</p>
                            <p className="text-sm text-gray-500">Fecha: {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    )) : <p>No hay reseñas</p>}
                </div>
                <Pagination>
                    {[...Array(Math.ceil(roomReviews.length / reviewsPerPage)).keys()].map(number => (
                        <Pagination.Item key={number+1} active={number+1 === currentPage} onClick={() => paginate(number+1)}>
                            {number+1}
                        </Pagination.Item>
                    ))}
                </Pagination>
                <textarea value={reviews[selectedRoom._id] || ''} onChange={(event) => handleReviewChange(selectedRoom._id, event)} className="w-full p-2 border rounded mb-2" placeholder="Deja una reseña" />
                <button onClick={() => handleReviewSubmit(selectedRoom._id)} className="w-full py-2 bg-blue-500 text-white rounded">Enviar reseña</button>
                <button onClick={() => setSelectedRoom(null)} className="w-full py-2 mt-4 text-center text-white bg-red-500 rounded">Cerrar</button>
            </div>
        </div>
    </div>
)}


        </div>
    );
}

export default HotelRooms;
