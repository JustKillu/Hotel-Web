import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

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
    } else {
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

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      img: event.target.files[0]
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const promotion = {
      name: event.target.name.value,
      description: event.target.description.value,
      comodidaes: event.target.amenities.value,
      tarifas: Number(event.target.rates.value),
      evaluacion: Number(event.target.evaluation.value),
      img: formData.img
    };
    const formData2 = new FormData();
    Object.keys(promotion).forEach(key => formData2.append(key, promotion[key]));
  
    if (editId) {
      editPromotion(editId, formData2);
    } else {
      addPromotion(formData2);
    }
    setShowForm(false);
  };
  
  return (
    <div className="p-4 items-center font-sans bg-yellow-50 text-black-900">
      <h1 className="text-4xl font-bold text-gray-800 text-center py-4">Promociones Activas!</h1>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSubmit}>
            <input className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="name" placeholder="Nombre" required defaultValue={formData.name} />
            <input className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="description" placeholder="Descripción" required defaultValue={formData.description} />
            <input className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="amenities" placeholder="Comodidades" required defaultValue={formData.amenities} />
            <input className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="number" name="rates" placeholder="Tarifas" required defaultValue={formData.rates} />
            <input className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4" type="number" name="evaluation" placeholder="Evaluación" required defaultValue={formData.evaluation} />
            <label className="block mt-4">
          <span className="text-gray-700">Imagen:</span>
          <input type="file" name="img" onChange={handleFileChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-light-text dark:text-dark-text font-bold py-2 px-4 rounded" type="submit">Enviar</button>
        <button className="bg-red-500 hover:bg-red-600 text-light-text dark:text-dark-text font-bold py-2 px-4 rounded mb-4 float-right" onClick={handleCloseClick}>Cerrar</button>
      </form>
    </div>
  )}
      <div className="flex overflow-x-auto pb-10 scrollbar-hide">
        <div className="flex flex-nowrap -mx-3">
        {promotions.map(promotion => (
  <div key={promotion._id} className="px-3">
    <div className="h-80 flex-shrink-0 w-96 md:w-96 relative overflow-hidden bg-purple-500 rounded-lg shadow-lg">
      
      <img src={`data:${promotion.img.contentType};base64,${Buffer.from(promotion.img.data).toString('base64')}`} alt={promotion.name} className="w-full h-full object-cover" />

<div className="absolute top-0 left-0 p-4">
        <h2 className="text-3xl leading-26  font-bold text-white">{promotion.name}</h2>
<div className="mt-6 pt-3">
          <p className="text-xl text-white leading-7">{promotion.description}</p>
        </div>
        <div className="mt-1">
          <span className="font-semibold text-white">{promotion.tarifa}</span>
        </div>

        {isUser && (
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={moverPag}>Hacer Reservacion</button>
        )}

                </div>
                {isAdmin && (
                  <div className="absolute bottom-0 right-0 p-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-light-text dark:text-dark-text  font-bold py-2 px-3 rounded" onClick={() => handleEditClick(promotion)}>Editar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-light-text dark:text-dark-text  font-bold py-2 px-3 rounded ml-2" onClick={() => deletePromotion(promotion._id)}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <button className="bg-yellow-500 hover:bg-yellow-600 mt-2 text-light-text dark:text-dark-text  font-bold py-2 px-4 rounded mb-4" onClick={handleAddClick}>Añadir promoción</button>
      )}

    </div>
  );
};

export default PromotionComponent;