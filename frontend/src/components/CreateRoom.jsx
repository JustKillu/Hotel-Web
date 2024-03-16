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
        img: null
    });

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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" onChange={handleInputChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" onChange={handleInputChange} />
            </label>
            <label>
                Comodidades:
                <input type="text" name="comodidades" onChange={handleInputChange} />
            </label>
            <label>
                Tarifas:
                <input type="text" name="tarifas" onChange={handleInputChange} />
            </label>
            <label>
                Reviews:
                <input type="text" name="reviews" onChange={handleInputChange} />
            </label>
            <label>
                Evaluacion:
                <input type="text" name="evaluacion" onChange={handleInputChange} />
            </label>
            <label>
                Image:
                <input type="file" name="img" onChange={handleFileChange} />
            </label>
            <button type="submit">Create Room</button>
        </form>
    );
};

export default CreateRoom;
