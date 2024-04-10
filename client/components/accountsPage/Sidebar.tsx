import React from 'react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <aside className='h-screen w-1/4 ' aria-label='Sidebar'>
      <div className='h-screen overflow-y-auto rounded border border-r-2 bg-gradient-to-r from-[#d3cfda] to-[#b1afb6] px-3 py-4'>
        <div className='flex flex-col items-center pb-10'>
          <Image
            src='/people-03.png' // Replace with your image path
            alt='Profile'
            width={100}
            height={100}
            className='mb-3 h-56 w-56  rounded-full shadow-lg'
          />
          <h5 className='mb-1 text-xl font-medium text-black'>
            Anushtha Prakash
          </h5>
          <span className='text-sm text-gray-50 '>anushthaprakash</span>
          <button
            type='button'
            className='mb-2 me-2 mt-3 w-2/3 rounded-lg border border-gray-300 bg-gray-500 px-2 py-2.5 text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:z-10  focus:outline-none focus:ring-1 focus:ring-gray-700 '
          >
            Edit Profile
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
