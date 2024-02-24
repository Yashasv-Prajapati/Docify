import React from 'react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <aside className='h-screen w-1/4 ' aria-label='Sidebar'>
      <div className='overflow-y-auto rounded bg-gradient-to-r to-[#140533] from-[#250b47] px-3 py-4 border-r-2 border-[#7184f0] border h-screen'>
        <div className='flex flex-col items-center pb-10'>
          <Image
            src='/cover.png' // Replace with your image path
            alt='Profile'
            width={100}
            height={100}
            className='mb-3 h-56 w-56  rounded-full shadow-lg'
          />
          <h5 className='mb-1 text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r to-[#8e29f3] from-sky-400'>
            Anushtha Prakash
          </h5>
          <span className='text-sm text-gray-200 '>
            anushthaprakash
          </span>
          <button type="button" className="w-2/3 mt-3 py-2.5 px-2 me-2 mb-2 text-sm font-medium text-gray-400 focus:outline-none bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700 hover:text-white  focus:z-10 focus:ring-1 focus:ring-gray-700 ">Edit Profile</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
