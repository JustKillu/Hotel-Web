import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarMain from '../components/NavBarMain.jsx';
export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 1) {
      setAlert('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    if (password.length < 1) {
      setAlert('La contraseña debe tener al menos 5 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setAlert('Las contraseñas no coinciden');
      return;
    }

    const formData = {
      username,
      password,
      firstName,
      lastName,
      phone,
      country,
      email,
    };

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.success);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setAlert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
//Formualrio de registro
  return (
    <div className="flex flex-col items-center justify-center mt-40 mb-20">
            <NavBarMain /> 
     <form onSubmit={handleSubmit} className="w-2/5 p-6 bg-white rounded shadow-md">
        <label className="block mb-2 text-black">Nombre de usuario</label>
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Contraseña</label>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Confirmar contraseña</label>
        <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Nombre</label>
        <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Apellido</label>
        <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Numero de telefono</label>
        <input type="text" placeholder="Numero de telefono" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Pais</label>
        <input type="text" placeholder="Pais" value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Correo electrónico</label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <button type="submit" className="w-full p-2 text-light-text dark:text-dark-text  bg-orange-500 rounded hover:bg-orange-800">Register</button>
      {alert && <div className="bottom-0 mt-4 p-2 text-center text-black bg-red-200 rounded shadow-lg">{alert}</div>}
      {success && <div className="bottom-0   mt-4 p-2 text-center text-black bg-green-200 rounded shadow-lg">{success}</div>}
      
      </form>
    </div>
  );
}
