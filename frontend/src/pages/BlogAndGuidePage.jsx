import React, { useState } from 'react';
import Blog from '../components/Blog';
import TourGuide from '../components/TourGuide.jsx';
import NavBarMain from '../components/NavBarMain.jsx';


const BlogAndGuidePage = ({ posts, activities }) => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className='mb-12'>
      <NavBarMain/>
    <div className="flex flex-col justify-between mt-12 h-screen p-4">
      {showGuide ? (
        <TourGuide activities={activities} />
      ) : (
        <Blog posts={posts} />
      )}

      <button onClick={() => setShowGuide(!showGuide)} className="p-2 w-32 ml-4  bg-blue-500 text-light-text dark:text-dark-text  rounded">
        {showGuide ? 'Mostrar Blog' : 'Mostrar Guía Turística'}
      </button>
    </div>
    </div>
  );
};

export default BlogAndGuidePage;
