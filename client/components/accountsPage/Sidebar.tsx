import React from 'react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <aside className='h-screen w-1/4 ' aria-label='Sidebar'>
      <div className='h-screen overflow-y-auto rounded border border-r-2 border-[#7184f0] bg-gradient-to-r from-[#250b47] to-[#140533] px-3 py-4'>
        <div className='flex flex-col items-center pb-10'>
          <Image
            src='/cover.png' // Replace with your image path
            alt='Profile'
            width={100}
            height={100}
            className='mb-3 h-56 w-56  rounded-full shadow-lg'
          />
          <h5 className='mb-1 bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text text-xl font-medium text-transparent'>
            Anushtha Prakash
          </h5>
          <span className='text-sm text-gray-200 '>anushthaprakash</span>
          <button
            type='button'
            className='mb-2 me-2 mt-3 w-2/3 rounded-lg border border-gray-600 bg-gray-800 px-2 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10  focus:outline-none focus:ring-1 focus:ring-gray-700 '
          >
            Edit Profile
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
