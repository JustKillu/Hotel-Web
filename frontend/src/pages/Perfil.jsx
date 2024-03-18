import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarMain from '../components/NavBarMain.jsx';

const UserReservations = () => {
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('rol');
    let url = `http://localhost:3001/reservations/${userId}`;

    if (userRole === 'adm') {
      url = `http://localhost:3001/reservations`;
    }

    if (!userId) {
      setError('No se encontró el ID del usuario en el almacenamiento local.');
      return;
    }

    axios.get(url)
      .then(response => {
        setReservations(response.data);
      })
      .catch(err => {
        console.error('Hubo un error!', err);
        setError('Hubo un error al obtener las reservaciones del usuario.');
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!reservations) {
    return <div className="text-blue-500">Cargando reservaciones del usuario...</div>;
  }

  return (
    <div className='flex justify-center mt-16'>
      <NavBarMain /> 
      <div className="p-4 text-black">
        <h1 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text ">Reservaciones del usuario</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {reservations.map(reservation => (
            <div key={reservation._id} className="border p-4 mb-4 rounded shadow bg-white ">
              <h2 className="text-xl font-semibold">Factura de Reservación</h2>
              <p className="text-gray-700">ID de Reservación: {reservation._id}</p>
              {reservation.roomId.map((room, index) => (
                <p key={index} className="text-gray-700">Habitación: {room}</p>
              ))}
              <p className="text-gray-700">Fecha: {reservation.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReservations;
