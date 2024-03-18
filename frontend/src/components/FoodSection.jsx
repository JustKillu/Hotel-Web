import React from 'react';

const FoodSection = ({ id, title, food }) => {
    return (
      <section id={id} className="p-4 border-2 border-gray-300 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {food.map((item, index) => (
            <div key={index} className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
              <img src={item.src} alt={item.alt} className="w-full h-80 object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-light-text dark:text-dark-text  text-center">{item.name}</div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-75 transition-all duration-200 flex items-end justify-start text-light-text dark:text-dark-text  opacity-0 hover:opacity-100">
                <p className="p-4 bg-white bg-opacity-50 rounded text-left">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FoodSection;
  