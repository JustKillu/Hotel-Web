import React, { useState,useEffect } from 'react';
import HeroImage from '../components/HeroImage.jsx';
import WeatherComponent from '../components/Weather.jsx';
import Section from '../components/Section.jsx';
import RoomSection from '../components/RoomSection.jsx'; 
import FoodSection from '../components/FoodSection.jsx'; 
import PromotionSection from '../components/PromotionSection.jsx'; 
import NavBar from '../components/NavBar.jsx'; 

const heroImage = 'https://i.imgur.com/6Yk4Ms3.jpeg';

const HomePage = () => {
  const [selectedSection, setSelectedSection] = useState('Misión');
  const misiones = {
    "Misión": 'Nuestra misión es proporcionar el mejor servicio...',
    "Promesa de Servicio": 'Nuestra promesa es mantener siempre la calidad...',
    "Visión":'Buscamos ser reconocidos como el mejor hotel de lujo, elegancia y confort en Venezuela.',
    "Valores":'Servicio • Trabajo en equipo • Excelencia'
  };
  const roomImages = [
    { src: 'https://colineal.com/cdn/shop/articles/estilos-decoracion-habitaciones-principales.jpg', alt: 'Habitación 1', name: 'Deluxe',text:"La habitación Deluxe es un espacio de lujo diseñado para proporcionar la máxima comodidad y relajación. Cuenta con una cama king size con ropa de cama de alta calidad, un amplio baño con ducha de efecto lluvia y artículos de aseo de cortesía. La habitación también incluye un área de estar con sofá y televisión de pantalla plana, así como un minibar bien surtido. Las ventanas de piso a techo ofrecen vistas impresionantes de la ciudad." },
    { src: 'https://enzomuebles.com/wp-content/uploads/2023/09/peque-1-1024x897.jpg', alt: 'Habitación 2', name: 'Superior',text:"La habitación Superior ofrece un ambiente elegante y acogedor. Cuenta con una cama queen size con ropa de cama suave y cómoda, un baño moderno con todas las comodidades necesarias, y un área de trabajo con escritorio y silla ergonómica. También incluye una televisión de pantalla plana con canales por cable y un minibar. Las ventanas ofrecen vistas panorámicas de los alrededores del hotel." },
  ];
  const food = [
    { src: 'https://www.cocinacaserayfacil.net/wp-content/uploads/2018/06/Ensalada-cesar.jpg', alt: 'Comida 1', name: 'Ensalada Cesar',text:"Una refrescante mezcla de lechuga romana fresca, crujientes trozos de pan tostado, queso parmesano rallado y aderezo César cremoso. A menudo se sirve con pollo a la parrilla para añadir proteínas." },
    { src: 'https://imag.bonviveur.com/risotto-de-setas.jpg', alt: 'Comida 2', name: 'Risotto de setas',text:"Un cremoso arroz italiano cocinado lentamente con una variedad de setas, vino blanco y caldo de verduras. Se termina con queso parmesano para un toque extra de sabor." },
    { src: 'https://www.gourmet.cl/wp-content/uploads/2016/09/Filete-con-salsa-a-la-pimienta.jpg-editada-507x458.jpg', alt: 'Comida 3', name: 'Filete a la pimienta',text:"Un jugoso filete de ternera cocinado a la perfección, cubierto con una rica salsa de pimienta negra. Se sirve con patatas asadas y verduras al vapor." },
    { src: 'https://images.hola.com/imagenes/cocina/recetas/20191015151706/cheese-cake-tarta-queso/0-733-560/america-cheesecake-t.jpg', alt: 'Comida 4', name: 'Tarta de queso New York',text:"Un postre clásico con una base de galleta crujiente, un relleno de queso cremoso y una capa superior de salsa de frutas del bosque. Es el final perfecto para cualquier comida." },
  
  ];
  const restaurante = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Restaurant_in_The_Musée_d%27Orsay.jpg', alt: 'Comida 1', name: 'Entrada' },
    { src: 'https://static.wixstatic.com/media/5cecee_78de0f63516c41f99bd9fe3b71dd2b13~mv2.jpg/v1/fill/w_560,h_572,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image-empty-state.jpg', alt: 'Comida 2', name: 'Mesas'},
    { src: 'https://www.laazotearooftop.com/sites/default/files/gallery/img3.jpg', alt: 'Comida 3', name: 'Azotea' },

  ];

  return (
    <div className="flex flex-col mb-2 ">
      <NavBar/>
      <HeroImage image={heroImage}/>
      <Section id="nosotros" color="#38241c" title="Nosotros" text="Bienvenidos a nuestro hotel en Valera, Trujillo. Ofrecemos una experiencia inolvidable con nuestro servicio de primera clase y nuestras instalaciones de lujo." sections={misiones} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      <RoomSection id="habitaciones" color="#A52A2A" title="Habitaciones"text={roomImages.text} images={roomImages} />
      <FoodSection id="banquetes" title="Nuestros Mejores Platos" food={food} />
      <RoomSection id="areas" color="#D2691E" title="Areas"text={restaurante.text} images={restaurante} />
      <PromotionSection/>

      <div id="clima" className="p-12 text-center">
        <WeatherComponent /> 
      </div>
    </div>
  );
};

export default HomePage;
