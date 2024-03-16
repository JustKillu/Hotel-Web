import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx'; 
import Login from './pages/Login.jsx';
import Navbar from './components/NavBar.jsx';
import Admin from './pages/Admin.jsx';
<<<<<<< Updated upstream
=======
import Reserva from './pages/Reserva.jsx';
import Perfil from './pages/Perfil.jsx';
import BlogAndGuidePage from './pages/BlogAndGuidePage.jsx';
import Rooms from './pages/Rooms.jsx';


>>>>>>> Stashed changes


function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/admin" element={<Admin />} /> 
<<<<<<< Updated upstream
=======
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/guide" element={<BlogAndGuidePage />} />
        <Route path="/rooms" element={<Rooms />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
