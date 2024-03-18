import React, { useState } from 'react';

const Section = ({ id, color, title, text, sections, selectedSection, setSelectedSection }) => {
  return (
    <div id={id} className='p-12 md:flex md:flex-col md:items-center' style={{ backgroundColor: color}}>
 
 {title === 'Nosotros' && <h1 className='text-5xl sm:text-7xl md:text-9xl text-center text-pastel pt-60 mb-11'>Bienvenido</h1>}
   
      <p className='text-center max-w-xl mx-auto'>{text}</p>
      {sections && 
        <div className='mt-4 flex justify-center items-center text-center flex-wrap'>
          {Object.keys(sections).map((key) => (
            <button 
              key={key} 
              className={`m-1 p-2 rounded transition duration-300 ease-in-out transform ${selectedSection === key ? 'text-light-text dark:text-dark-text border-b-2 border-yellow-300 bg-yellow-900 ' :  ' text-gray-400 hover:bg-yellow-900'}`} 
              onClick={() => setSelectedSection(key)}
            >
              {key}
            </button>
          ))}
          
        </div>
      }
      {selectedSection && <p className='text-center justify-center max-w-xl whitespace-normal mx-auto mb-48 mt-2' >{sections[selectedSection]}</p>}
    </div>
  );
};

export default Section;
