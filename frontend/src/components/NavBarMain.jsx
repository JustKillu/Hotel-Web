import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavbarMain = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [role, setRole] = useState(localStorage.getItem('rol'));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  let timeoutId;

  useEffect(() => {
    const newUser = localStorage.getItem('user');
    const newRole = localStorage.getItem('rol');

    if (user !== newUser) {
      setUser(newUser);
    }
    if (role !== newRole) {
      setRole(newRole);
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
  };

  const handleMouseOver = () => {
    clearTimeout(timeoutId);
    setIsLoginOpen(true);
  };

  const handleMouseOut = () => {
    timeoutId = setTimeout(() => {
      setIsLoginOpen(false);
    }, 200);
  };
  return (
    <nav className="absolute top-0 w-full z-50 flex items-center justify-between p-6 bg-brown bg-opacity-80 text-white">

      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-xl tracking-tight">Hotel Valera</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="flex items-center px-3 py-2 border rounded text-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isNavOpen ? 'block' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow">
          <Link to="/" smooth duration={500} className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
            Inicio
          </Link>
          {user ? (
            <>
              <Link to="/perfil" className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Perfil
              </Link>
              <button onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Cerrar sesión
              </button>
              <Link to="/guide" className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Guia
              </Link>
            </>
            
          ) : (
            <div className="relative inline-block text-left" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <div>
                <button type="button" className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium hover:underline">
                  Iniciar sesión
                </button>
              </div>
  
              {isLoginOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/login" className="block px-4 py-2 text-sm text-white bg-brown hover:bg-pastel" role="menuitem">Iniciar sesión</Link>
                    <Link to="/register" className="block px-4 py-2 text-sm text-white bg-brown hover:bg-pastel" role="menuitem">Registrarse</Link>
                  </div>
                </div>
              )}
            </div>
            
          )}
        </div>
        {role === 'adm' && (
            <Link to="/admin" className="block mt-4 lg:inline-block lg:mt-0 hover:underline">
              Admin
            </Link>
          )}
      </div>
    </nav>
  );
}
export default NavbarMain;
