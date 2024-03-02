import React from 'react';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const goToNextSlide = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      activeIndex === 0 ? images.length - 1 : activeIndex - 1
    );
  };

  return (
    <div className="relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <button className="absolute left-0 p-4" onClick={goToPrevSlide}>Anterior</button>
      <button className="absolute right-0 p-4" onClick={goToNextSlide}>Siguiente</button>
    </div>
  );
};

export default Carousel;
