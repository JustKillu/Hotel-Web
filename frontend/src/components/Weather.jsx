import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Valera,ve&appid=b2b93786fd0442e155139dfb2e5f475c&units=metric`);
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
                // Imprime el mensaje de error completo
                console.error(error.message);
            }
        };
    
        fetchWeather();
    }, []);
    

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2>El clima actual en Valera, Trujillo, Venezuela es:</h2>
                    <h3>{weatherData.weather[0].description}</h3>
                    <h4>Temperatura: {weatherData.main.temp}°C</h4>
                    <p>Disfruta de nuestra terraza con este clima!</p>
                </div>
            ) : (
                <p>Cargando datos del clima...</p>
            )}
        </div>
    );
};

export default Weather;
