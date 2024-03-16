import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PromotionComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol === 'adm') {
      setIsAdmin(true);
    }else{
      setIsUser(true)
    }

    axios.get('http://localhost:3001/promotions')
      .then(response => {
        if (Array.isArray(response.data)) {
          setPromotions(response.data);
        } else {
          console.error('Error: La respuesta no es un array');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const addPromotion = (promotion) => {
    axios.post('http://localhost:3001/promotions', promotion)
      .then(response => {
        setPromotions([...promotions, response.data]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const editPromotion = (id, updatedPromotion) => {
    axios.put(`http://localhost:3001/promotions/${id}`, updatedPromotion)
      .then(response => {
        setPromotions(promotions.map(promotion => promotion._id === id ? response.data : promotion));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const deletePromotion = (id) => {
    axios.delete(`http://localhost:3001/promotions/${id}`)
      .then(() => {
        setPromotions(promotions.filter(promotion => promotion._id !== id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleAddClick = () => {
    setShowForm(true); 
    setEditId(null);
    setFormData({});
  };
  const moverPag = () => {
    navigate('/reserva');
  };

  const handleEditClick = (promotion) => {
    setShowForm(true);
    setEditId(promotion._id);
    setFormData(promotion);
  };

  const handleCloseClick = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const promotion = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: Number(event.target.price.value),
      quantity: Number(event.target.quantity.value),
      image: event.target.image.value,
      time: event.target.time.value
    };
    if (editId) {
      editPromotion(editId, promotion);
    } else {
      addPromotion(promotion);
    }
    setShowForm(false);
  };
  return (
    <div className="p-4 items-center font-sans bg-yellow-50 text-black-900">
     <h1 className="text-4xl font-bold text-gray-800 text-center py-4">Promociones Activas!</h1>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSubmit}>
            <input className=" border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="name" placeholder="Nombre de la promoción" required defaultValue={formData.name} />
            <input className=" border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="description" placeholder="Descripción de la promoción" required defaultValue={formData.description} />
            <input className=" border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="number" name="price" placeholder="Precio de la promoción" required defaultValue={formData.price} />
            <input className="border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-4" type="number" name="quantity" placeholder="Cantidad de la promoción" required defaultValue={formData.quantity} />
            <input className=" border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="image" placeholder="Imagen de la promoción" required defaultValue={formData.image} />
            <input className="border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="time" placeholder="Tiempo de la promoción" required defaultValue={formData.time} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4 float-right" onClick={handleCloseClick}>Cerrar</button>
          </form>
        </div>
      )}
      <div className="flex overflow-x-auto pb-10 scrollbar-hide">
        <div className="flex flex-nowrap -mx-3">
          {promotions.map(promotion => (
            <div key={promotion._id} className="px-3">
              <div className="h-80 flex-shrink-0 w-96 md:w-96 relative overflow-hidden bg-purple-500 rounded-lg shadow-lg">
                <img className="absolute w-full h-full " src={promotion.image} alt={promotion.name} />
                <div className="relative pl-4 mt-6">
                  <h2 className="text-3xl leading-7 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-white">{promotion.name}</h2>
                  <div className="mt-1">
                    <span className="font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">{promotion.price}</span>
                    <span className="ml-1 text-sm text-purple-300  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">USD</span>
                  </div>
                  <div className="mt-6 pt-3">
                    <h4 className="text-xl text-white leading-7 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">{promotion.description}</h4>
                  </div>
                  {isUser && (
        <button className="bg-yellow-500 hover:bg-yellow-600 bottom-0  text-white font-bold py-2 px-4 rounded mb-4" onClick={moverPag}>Hacer Reservacion</button>
      )}
                </div>
                {isAdmin && (
                  <div className="absolute bottom-0 right-0 p-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded" onClick={() => handleEditClick(promotion)}>Editar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded ml-2" onClick={() => deletePromotion(promotion._id)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <button className="bg-yellow-500 hover:bg-yellow-600 mt-2 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleAddClick}>Añadir promoción</button>
      )}
   
    </div>
  );
};

export default PromotionComponent;