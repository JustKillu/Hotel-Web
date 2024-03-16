# Hotel en Valera/Trujillo - Repositorio de Web Online

Este repositorio contiene el código del backend y el frontend de la aplicación web de nuestro hotel situado en Valera/Trujillo. Aquí encontrarás instrucciones sobre cómo clonar el proyecto, configurar la base de datos MongoDB, e iniciar el servidor y el frontend.


## Clonar el proyecto

Para clonar el proyecto, puedes usar el siguiente comando en tu terminal:

git clone https://github.com/JustKillu/Hotel-Web

## Configurar la base de datos MongoDB

Este proyecto utiliza MongoDB como base de datos. Para configurar MongoDB, sigue estos pasos:

1. Instala MongoDB en tu máquina local o configura una base de datos MongoDB en la nube.
2. Crea una base de datos llamada 'Hotel'.
3. En el archivo principal del servidor, asegúrate de que la cadena de conexión a MongoDB apunta a tu base de datos MongoDB.

## Iniciar el servidor

Para iniciar el servidor, navega hasta la carpeta del servidor en tu terminal y ejecuta el siguiente comando:

\`\`\`
node servidor.js
\`\`\`

El servidor debería comenzar a ejecutarse en `http://localhost:3001`.

## Iniciar el frontend

Para iniciar el frontend, navega hasta la carpeta del frontend en tu terminal y ejecuta el siguiente comando:

\`\`\`
npm run dev
\`\`\`

El frontend debería comenzar a ejecutarse en `http://localhost:5173`.

# Frontend del repositorio de web online

Este es el frontend de mi aplicación web online. Aquí encontrarás información sobre las rutas y componentes disponibles.

## Archivo principal de React (App.jsx)

El archivo principal de React (App.jsx) es el punto de entrada de la aplicación. Este archivo define las rutas de la aplicación y los componentes que se renderizan en cada ruta.

### Rutas disponibles

- `/`: La ruta raíz de la aplicación que renderiza el componente `HomePage`.
- `/register`: La ruta para el registro de usuarios que renderiza el componente `Register`.
- `/login`: La ruta para el inicio de sesión de usuarios que renderiza el componente `Login`.
- `/admin`: La ruta para la página de administración que renderiza el componente `Admin`. Desde aquí, se pueden modificar los datos de los usuarios registrados.
- `/reserva`: La ruta para la página de reserva que renderiza el componente `Reserva`.
- `/perfil`: La ruta para la página de perfil de usuario que renderiza el componente `Perfil`.
- `/guide`: La ruta para la página de blog y guía que renderiza el componente `BlogAndGuidePage`.


1. `Blog.jsx`: Este es el componente del blog.
2. `FoodSection.jsx`: Este componente se utiliza para la sección de alimentos.
3. `HeroImage.jsx`: Este componente se utiliza para la imagen principal.
4. `NavBar.jsx` y `NavBarMain.jsx`: Estos componentes se utilizan para la barra de navegación.
5. `PromotionComp.jsx` y `PromotionSection.jsx`: Estos componentes se utilizan para las promociones.
6. `RoomSection.jsx`: Este componente se utiliza para la sección de habitaciones.
7. `Section.jsx`: Este es un componente genérico de sección.
8. `TourGuide.jsx`: Este componente se utiliza para la guía de turismo.
9. `Weather.jsx`: Este componente se utiliza para mostrar el clima.

# Backend del repositorio de web online

Este es el backend de mi aplicación web online. Información sobre las rutas y funcionalidades disponibles.

## Archivo principal del servidor

El archivo principal para correr el servidor es un archivo Node.js que utiliza Express y se conecta a una base de datos MongoDB. Este archivo inicializa la aplicación Express, permite solicitudes CORS desde tu aplicación React, usa express.json() como middleware para analizar el cuerpo de las solicitudes JSON, se conecta a MongoDB y define las rutas de la aplicación.

## Modelo de usuario

1. `User.js`: Este es el modelo de usuario que define el esquema para los usuarios en la base de datos. Cada usuario tiene un nombre de usuario, contraseña, nombre, apellido, teléfono, país, correo electrónico, rol. El modelo de usuario también incluye una función pre-save para hashear la contraseña antes de guardarla en la base de datos.
2. `Post.js`: Este es el modelo de publicaciones en el blog.
3. `Reservations.js`: Este es el modelo de reservaciones.
4. `Room.js`: Este es el modelo de habitaciones.

## Rutas de autenticación (Auth routes)

1. `POST /login`: Esta ruta permite a los usuarios iniciar sesión. Si el nombre de usuario y la contraseña son correctos, se genera un token JWT que incluye el ID y el rol del usuario.

2. `GET /user/:id`: Esta ruta permite obtener los detalles de un usuario específico utilizando su ID.

3. `GET /user`: Esta ruta permite obtener los detalles del usuario actual. El usuario se identifica mediante un token JWT enviado en el encabezado de autorización.

4. `GET /allusers`: Esta ruta permite obtener todos los usuarios. Sin embargo, solo los usuarios con el rol de 'adm' pueden acceder a esta ruta.

5. `PUT /user/:id`: Esta ruta permite actualizar los detalles de un usuario. Si se proporciona una contraseña, se hashea antes de guardarla en la base de datos.

6. `DELETE /user/:id`: Esta ruta permite eliminar un usuario utilizando su ID.

7. `PUT /user/:id/password`: Esta ruta permite actualizar la contraseña de un usuario. Se requiere la contraseña antigua para la verificación.


## Rutas de autenticación adicionales (Auth routes)

Estas rutas adicionales permiten a los usuarios iniciar sesión, interactuar con sus productos favoritos, actualizar sus datos y más.

- `POST /login`: Inicia sesión un usuario existente.
- `GET /user/:id/favorites`: Obtiene los productos favoritos de un usuario.
- `GET /user`: Obtiene los detalles de un usuario autenticado.
- `GET /allusers`: Obtiene todos los usuarios (solo para administradores).
- `PUT /user/:id`: Actualiza los datos de un usuario.
- `DELETE /user/:id`: Elimina un usuario.
- `PUT /user/:id/password`: Actualiza la contraseña de un usuario.
- `PUT /update-user/:id`: Actualiza los datos de un usuario, incluyendo la contraseña.

## Ruta de blog (blogRoutes)

1. `GET /blog`: Esta ruta permite obtener todos los posts del blog. Si ocurre algún error durante la obtención de los posts, se devuelve un mensaje de error.

2. `POST /blog`: Esta ruta permite crear un nuevo post en el blog. El post se crea con los datos proporcionados en el cuerpo de la solicitud (título, extracto, imagen y enlace). Si el post se guarda correctamente, se devuelve el post guardado. Si ocurre algún error durante la creación del post, se devuelve un mensaje de error.

## Ruta de promociones (promotionRoutes)

1. `GET /promotions`: Esta ruta permite obtener todas las promociones. Si ocurre algún error durante la obtención de las promociones, se devuelve un mensaje de error.

2. `GET /promotions/:id`: Esta ruta permite leer una promoción específica. Si la promoción no se encuentra, se devuelve un mensaje de error.

3. `POST /promotions`: Esta ruta permite crear una nueva promoción. La promoción se crea con los datos proporcionados en el cuerpo de la solicitud (nombre, descripción, precio, cantidad, imagen, tiempo). Si la promoción se guarda correctamente, se devuelve la promoción guardada. Si ocurre algún error durante la creación de la promoción, se devuelve un mensaje de error.

4. `PUT /promotions/:id`: Esta ruta permite actualizar una promoción existente. Si la promoción se actualiza correctamente, se devuelve la promoción actualizada. Si la promoción no se encuentra, se devuelve un mensaje de error.

5. `DELETE /promotions/:id`: Esta ruta permite eliminar una promoción existente. Si la promoción se elimina correctamente, se devuelve un mensaje de éxito. Si la promoción no se encuentra, se devuelve un mensaje de error.

## Ruta de reservas (reservationRoutes)

1. `GET /reservations`: Esta ruta permite obtener todas las reservas. Si ocurre algún error durante la obtención de las reservas, se devuelve un mensaje de error.

2. `POST /reservations`: Esta ruta permite crear una nueva reserva. La reserva se crea con los datos proporcionados en el cuerpo de la solicitud (userId, roomId, date). Si la reserva se guarda correctamente, se devuelve la reserva guardada. Si ocurre algún error durante la creación de la reserva, se devuelve un mensaje de error.

3. `GET /reservations/:userId`: Esta ruta permite obtener todas las reservas de un usuario específico. Si no se encuentran reservas para este usuario, se devuelve un mensaje de error.

4. `POST /promociones`: Esta ruta permite enviar una promoción a un usuario específico. Si el usuario no se encuentra, se devuelve un mensaje de error.

## Ruta de habitaciones (roomRoutes)

1. `GET /rooms`: Esta ruta permite obtener todas las habitaciones. Si ocurre algún error durante la obtención de las habitaciones, se devuelve un mensaje de error.

2. `POST /rooms`: Esta ruta permite crear una nueva habitación. La habitación se crea con los datos proporcionados en el cuerpo de la solicitud (nombre, descripción, precio, tiempo, imagen). Si la habitación se guarda correctamente, se devuelve la habitación guardada. Si ocurre algún error durante la creación de la habitación, se devuelve un mensaje de error.

## Ruta de habitaciones (roomRoutes)

1. `GET /rooms`: Esta ruta permite obtener todas las habitaciones. Si ocurre algún error durante la obtención de las habitaciones, se devuelve un mensaje de error.

2. `POST /rooms`: Esta ruta permite crear una nueva habitación. La habitación se crea con los datos proporcionados en el cuerpo de la solicitud (nombre, descripción, precio, tiempo, imagen). Si la habitación se guarda correctamente, se devuelve la habitación guardada. Si ocurre algún error durante la creación de la habitación, se devuelve un mensaje de error.
