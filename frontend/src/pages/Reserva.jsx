import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarMain from '../components/NavBarMain.jsx';
import { Buffer } from 'buffer';

const Reserva = () => {
  const [rooms, setRooms] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [formData, setFormData] = useState({
    userId: localStorage.getItem('id'),
    roomId: [],
    date: '',
  });
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [hoveredPromotion, setHoveredPromotion] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Hubo un error!', error);
      });

    axios.get('http://localhost:3001/promotions')
      .then(response => {
        setPromotions(response.data);
      })
      .catch(error => {
        console.error('Hubo un error!', error);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    const roomName = e.target.name;
    setFormData(prevFormData => {
      if (e.target.checked) {
        return {
          ...prevFormData,
          roomId: [...prevFormData.roomId, roomName],
        };
      } else {
        return {
          ...prevFormData,
          roomId: prevFormData.roomId.filter(name => name !== roomName),
        };
      }
    });
  };

  const handlePromotionChange = (e) => {
    const promotionName = e.target.name;
    setFormData(prevFormData => {
      if (e.target.checked) {
        return {
          ...prevFormData,
          roomId: [...prevFormData.roomId, promotionName],
        };
      } else {
        return {
          ...prevFormData,
          roomId: prevFormData.roomId.filter(name => name !== promotionName),
        };
      }
    });
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userId === "null" || !formData.roomId.length || !formData.date) {
      setAlert({ type: 'error', message: 'Por favor, completa todos los campos.' });
    } else {
      axios.post('http://localhost:3001/reservations', formData)
        .then(response => {
          console.log(response);
          setAlert({ type: 'success', message: 'Reservación realizada con éxito. Se te enviara informacion al correo' });
        })
        .catch(error => {
          console.error('Hubo un error!', error);
          setAlert({ type: 'error', message: 'Hubo un error al realizar la reservación.' });
        });
    }

    setTimeout(() => {
      setAlert(null);
    }, 1200);
  };

  return (
    <div>
      <NavBarMain />
      <div className='absolute top-0 right-0 m-4'>
        {alert && (
          <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-light-text dark:text-dark-text  px-6 py-4 rounded mb-4 w-full max-w-md`}>
            {alert.message}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mt-32">
        <form className="flex flex-col w-full max-w-md bg-white text-black rounded-xl p-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            Habitaciones:
            {Array.isArray(rooms) && rooms.map(room => {
  let imgSrc = '';
  if (room.img && room.img.data && room.img.data.data) {
    imgSrc = `data:${room.img.contentType};base64,${Buffer.from(room.img.data.data).toString('base64')}`;
  }
  return (
    <label key={room.id} className="block relative" onMouseEnter={() => setHoveredRoom(room)} onMouseLeave={() => setHoveredRoom(null)}>
      <input type="checkbox" name={room.name} onChange={handleCheckboxChange} onMouseEnter={() => setHoveredRoom(room)} onMouseLeave={() => setHoveredRoom(null)} />
      <span className="ml-2 ">{room.name}</span>
      {hoveredRoom === room && (
        <div className=" p-4 border rounded-xl border-gray-700 bg-white absolute ml-64  w-full z-10">
          <img src={imgSrc} alt={room.name} className="w-full h-32 object-cover mb-2 " />
          <h2 className="text-2xl font-semibold mb-2">{room.name}</h2>
          <p className="mb-2"><strong>Descripción:</strong> {room.description}</p>
          <p className="mb-2"><strong>Comodidades:</strong> {room.comodidades}</p>
          <p className="mb-2"><strong>Tarifas:</strong> {room.tarifas}</p>
          <p className="mb-2"><strong>Evaluación:</strong> {room.evaluacion}</p>
          <p className="mb-2"><strong>Reseñas:</strong></p>
        </div>
      )}
    </label>
  );
})}

          </div>
          <div className="mb-2">
  Promociones:
  {Array.isArray(promotions) && promotions.map(promotion => {
  let imgSrc = '';
  if (promotion.img && promotion.img.data && promotion.img.data.data) {
    imgSrc = `data:${promotion.img.contentType};base64,${Buffer.from(promotion.img.data.data).toString('base64')}`;
  }
  return (
    <label key={promotion.id} className="block relative" onMouseEnter={() => setHoveredPromotion(promotion)} onMouseLeave={() => setHoveredPromotion(null)}>
      <input type="checkbox" name={promotion.name} onChange={handlePromotionChange} onMouseEnter={() => setHoveredPromotion(promotion)} onMouseLeave={() => setHoveredPromotion(null)} />
      <span className="ml-2">{promotion.name}</span>
      {hoveredPromotion === promotion && (
        <div className=" p-4 border rounded-xl border-gray-700 bg-white absolute ml-64  w-full z-10">
          <img src={imgSrc} alt={promotion.name} className="w-full h-32 object-cover mb-2 " />
          <h2 className="text-2xl font-semibold mb-2">{promotion.name}</h2>
          <p className="mb-2"><strong>Descripción:</strong> {promotion.description}</p>
          <p className="mb-2"><strong>Comodidades:</strong> {promotion.comodidades}</p>
          <p className="mb-2"><strong>Tarifas:</strong> {promotion.tarifas}</p>
          <p className="mb-2"><strong>Evaluación:</strong> {promotion.evaluacion}</p>
          <p className="mb-2"><strong>Reseñas:</strong></p>
        </div>
      )}
    </label>
  );
})}

</div>
<label className="mb-2 ">
  Fecha:
  <input className="border-2 bg-gray-200  border-gray-300 p-2" type="date" name="date" onChange={handleDateChange} />
</label>
<button className="bg-blue-500 text-light-text dark:text-dark-text  p-2 mt-4" type="submit">Enviar</button>
</form>
</div>
</div>
);}

export default Reserva;
