import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PromotionComponent = () => {
  const [userId, setUserId] = useState('');
  const [promotion, setPromotion] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePromotionChange = (event) => {
    setPromotion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/promociones', { userId, promotion });
      console.log(response.data.message);
      setShowAlert(true);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="fixed bottom-0 right-0 p-4 mr-6 mb-4 rounded-xl  bg-pastel">
      {showAlert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline"> Promoción enviada exitosamente.</span>
        </div>
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setIsOpen(true)}>
        Mandar Publicidad
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className='mb-16'>
          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
              ID de Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="userId"
              type="text"
              placeholder="ID de Usuario"
              value={userId}
              onChange={handleUserIdChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="promotion">
              Promoción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="promotion"
              placeholder="Escribe tu promoción aquí"
              value={promotion}
              onChange={handlePromotionChange}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-light-text dark:text-dark-text  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Enviar Promoción
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-light-text dark:text-dark-text  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setIsOpen(false)}>
              Cerrar Formulario
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PromotionComponent;
