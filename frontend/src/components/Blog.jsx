import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', excerpt: '', image: '', link: '' });

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user ? true : false);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/blog')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/blog', newPost) 
      .then(response => {
        setPosts([...posts, response.data]); 
        setNewPost({ title: '', excerpt: '', image: '', link: '' }); 
        setShowForm(false); 
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="flex flex-col justify-between h-screen p-4">
      <div>
        
        <h1 className="text-2xl font-bold mb-4">Blog de Turismo</h1>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4 space-y-4 p-4 rounded-xl w-96 bg-white  h-80 fixed ">
            <input type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Título" required className="w-full p-2 border rounded" />
            <textarea value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} placeholder="Extracto" required className="w-full p-2 border rounded" />
            <input type="text" value={newPost.image} onChange={e => setNewPost({ ...newPost, image: e.target.value })} placeholder="URL de la imagen" required className="w-full p-2 border rounded" />
            <input type="text" value={newPost.link} onChange={e => setNewPost({ ...newPost, link: e.target.value })} placeholder="URL del post" required className="w-full p-2 border rounded" />
            <div className="flex justify-end space-x-2">
              <button type="submit" className="p-2 bg-blue-500 text-white rounded">Crear</button>
              <button type="button" onClick={() => setShowForm(false)} className="p-2 bg-red-500 text-white rounded">Cerrar</button>
            </div>
          </form>
        )}
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="border rounded p-2 bg-yellow-600">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              <h2 className="text-xl font-bold mt-2">{post.title}</h2>
              <p className="text-gray-700">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn && <button onClick={() => setShowForm(true)} className="p-2 bg-blue-500 text-white rounded self-start">Nueva Publicación</button>}
    </div>
  );
};

export default BlogPage;
