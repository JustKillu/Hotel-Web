import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const RoomSection = ({ id, color, title, images }) => {
    const bgColor = id === 'reserva' ? ' bg-brown text-white' : (id === 'banquetes' ? 'bg-orange-200 text-black' : 'bg-white text-black');

    return (
        <div className={bgColor}>
            <div id={id} className='p-12 text-center h-[700px] mb-14'> 
                <h2 className="text-2xl mb-4 text-left">{title}</h2>
                <div className="relative">
                    <Carousel showThumbs={false} showStatus={false} className="z-10 carousel-control-small">
                        {images.map((image, index) => (
                            <div key={index}>
                                <div className="flex justify-center text-left items-center mb-4">
                                    <h1 className="text-4xl mr-4">{image.name}</h1>
                                    <p className="text-lg">{image.text}</p>
                                </div>
                                <img src={image.src} alt={image.alt} className="max-h-[500px] w-full object-cover" />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default RoomSection;
