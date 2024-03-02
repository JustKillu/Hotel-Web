import React from 'react';

const HeroImage = ({ image }) => (
  <div className="w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url(${image})` }} />
);


export default HeroImage;
