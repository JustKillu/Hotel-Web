import React, { useState } from 'react';
import axios from 'axios';

const CreateRoom = () => {
    const [room, setRoom] = useState({
        name: '',
        description: '',
        comodidades: '',
        tarifas: '',
        reviews: '',
        evaluacion: '',
        img: null,
        espacio: ''
    });
    const [showCard, setShowCard] = useState(false);

    const handleInputChange = (event) => {
        setRoom({
            ...room,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setRoom({
            ...room,
            img: event.target.files[0]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        Object.keys(room).forEach(key => formData.append(key, room[key]));

        axios.post('http://localhost:3001/rooms', formData)
            .then(response => {
                console.log('Room created: ', response.data);
            })
            .catch(error => {
                console.error('Error creating room: ', error);
            });
    };

    return (
        <div className="flex flex-col items-start justify-between ">
            {showCard && (
                <form onSubmit={handleSubmit} className="mt-4 mb-56 ml-14 p-4 border rounded shadow-lg bg-white fixed bottom-0 left-0 z-50">
                    <label className="block">
                        <span className="text-gray-700">Name:</span>
                        <input type="text" name="name" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Description:</span>
                        <input type="text" name="description" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Comodidades:</span>
                        <input type="text" name="comodidades" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Tarifas:</span>
                        <input type="text" name="tarifas" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Evaluacion:</span>
                        <input type="text" name="evaluacion" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Espacio:</span>
                        <input type="text" name="espacio" onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Image:</span>
                        <input type="file" name="img" onChange={handleFileChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Enviar
                    </button>
                </form>
 )}

<button 
    className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-full fixed bottom-8 left-0 z-50"
    onClick={() => setShowCard(!showCard)}
>
    Crear Habitación
</button>

</div>
    );
};

export default CreateRoom;
