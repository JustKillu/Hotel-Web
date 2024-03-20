import React from 'react';
// en el video se me paso colocar el valor de text-light-text dark:text-dark-text para manejar darkmode
const TourGuide = () => {
  return (
    <div className="p-4 text-light-text dark:text-dark-text prose">
      <h1 className="text-2xl font-bold mb-4">Guía Turística del Hotel Valera</h1>
      <p>¡Bienvenido al Hotel Valera! Aquí te presentamos algunas de las actividades y servicios que puedes disfrutar durante tu estancia con nosotros.</p>

      <h2 className="text-xl font-bold mt-4">Desayuno en el Restaurante Gourmet</h2>
      <img src="https://travelxcapes.com/wp-content/uploads/2023/04/tipos-de-desayunos-de-hoteles.webp" alt="Desayuno en el Restaurante Gourmet" className="w-full h-64 object-cover mt-2" />
      <p>Comienza tu día con un desayuno nutritivo en nuestro restaurante gourmet. Ofrecemos una variedad de opciones, desde platos locales hasta clásicos internacionales.</p>

      <h2 className="text-xl font-bold mt-4">Clases de Yoga en el Gimnasio</h2>
      <img src="https://media.revistaad.es/photos/622f4aa12b114d8e41154bd0/16:9/w_1999,h_1124,c_limit/Villa%20Arnica.%20Laura%20Limberg.-64_b.jpg" alt="Clases de Yoga en el Gimnasio" className="w-full h-64 object-cover mt-2" />
      <p>Después del desayuno, dirígete a nuestro gimnasio para una sesión de yoga. Es una excelente manera de estirar y prepararte para el día.</p>

      <h2 className="text-xl font-bold mt-4">Excursiones Locales</h2>
      <img src="https://www.asmregiondemurcia.org/wp-content/uploads/2017/09/CalardeValera01.jpg" alt="Excursiones Locales" className="w-full h-64 object-cover mt-2" />
      <p>A media mañana, únete a nuestras excursiones locales. Explora Valera y sus alrededores, visita sitios históricos y disfruta de la belleza natural de la zona.</p>

      <h2 className="text-xl font-bold mt-4">Almuerzo en el Restaurante Gourmet</h2>
      <img src="https://previews.123rf.com/images/paylessimages/paylessimages1503/paylessimages150323113/46371775-hotel-menú-de-almuerzo.jpg" alt="Almuerzo en el Restaurante Gourmet" className="w-full h-64 object-cover mt-2" />
      <p>Regresa al hotel para un almuerzo relajante en nuestro restaurante. Prueba los deliciosos platos locales preparados por nuestros chefs expertos.</p>

      <h2 className="text-xl font-bold mt-4">Tiempo Libre en la Piscina</h2>
      <img src="https://www.fluidra.com/projects//web/app/uploads/2022/04/iStock-119926339-1.jpg" alt="Tiempo Libre en la Piscina" className="w-full h-64 object-cover mt-2" />
      <p>Por la tarde, disfruta de un tiempo libre en nuestra piscina al aire libre. Relájate en una tumbona, toma un baño o disfruta de un cóctel en el bar de la piscina.</p>

      <h2 className="text-xl font-bold mt-4">Clases de Cocina</h2>
      <img src="https://www.oyster.com/wp-content/uploads/sites/35/2019/05/free-cooking-class-v4219425-1440-1024x683.jpg" alt="Clases de Cocina" className="w-full h-64 object-cover mt-2" />
      <p>Aprende a preparar platos locales en nuestras clases de cocina. Nuestros chefs te enseñarán cómo preparar deliciosas comidas que podrás recrear en casa.</p>

      <h2 className="text-xl font-bold mt-4">Cata de Vinos</h2>
      <img src="https://www.shutterstock.com/image-photo/three-glasses-white-rose-red-600nw-1906934800.jpg" alt="Cata de Vinos" className="w-full h-64 object-cover mt-2" />
      <p>Únete a nuestra cata de vinos y descubre los sabores de los vinos locales. Nuestro sommelier te guiará a través de una selección de vinos y te enseñará a apreciar sus sutilezas.</p>
  
</div>
  );
};

export default TourGuide;
