import React, { useState } from 'react';
const Section = ({ id, color, title, text, sections, selectedSection, setSelectedSection }) => {
  return (
    <div id={id} className='p-12 ' style={{ backgroundColor: color}}>
      <h1 className='flex item-center justify-center 2xl mt-48'>{title}</h1>
      {title === 'Nosotros' && <h1 className='flex items-center justify-center text-9xl text-pastel mb-11'>Bienvenido</h1>}
    
      <p className='text-center max-w-xl mx-auto'>{text}</p>
      {sections && 
        <div className='mt-4 flex justify-center items-center text-center'>
          {Object.keys(sections).map((key) => (
            <button 
              key={key} 
              className={`m-1 p-2 rounded transition duration-300 ease-in-out transform ${selectedSection === key ? 'text-white border-b-2 border-yellow-300 bg-yellow-900 ' :  ' text-gray-400 hover:bg-yellow-900'}`} 
              onClick={() => setSelectedSection(key)}
            >
              {key}
            </button>
          ))}
          
        </div>
      }
      {selectedSection && <p className='text-center justify-center max-w-xl whitespace-nowrap mx-auto mb-48 mt-2' >{sections[selectedSection]}</p>}
    </div>
  );
};

export default Section;
