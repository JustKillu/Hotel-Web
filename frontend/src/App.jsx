import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx'; 
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Reserva from './pages/Reserva.jsx';
import Perfil from './pages/Perfil.jsx';
import BlogAndGuidePage from './pages/BlogAndGuidePage.jsx';
import Rooms from './pages/Rooms.jsx';
import { ThemeProvider, ThemeContext } from './ThemeProvider'; 

function App() {
  return (
    <ThemeProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/guide" element={<BlogAndGuidePage />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
