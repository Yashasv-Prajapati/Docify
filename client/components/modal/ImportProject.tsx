'use client';

import React, { useRef, useState } from 'react';

interface ProfileEditProps {
  isVisible: boolean;
  onClose: () => void;
}

function ImportProject({ isVisible, onClose }: ProfileEditProps): JSX.Element {
  const [agree, setAgree] = useState(false);
  const [techstack, setTechstack] = useState('');
  console.log('teck :', techstack);
  const handleAgree = () => {
    setAgree(true);
    // Perform any additional actions needed when user agrees
  };

  const handleContinue = () => {
    setAgree(false);
    onClose();
    // CALL THE API HERE BASED ON THE TECKSTACK {java,python}
  };

  const handleTechStackSelection = (stack: string) => {
    setTechstack(stack);
  };
  if (!isVisible) return <></>;
  return (
    <div className='item-center fixed inset-0 flex justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='fixed  z-50  flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center md:inset-0'>
        <div className='relative max-h-full w-full max-w-md p-4'>
          {agree ? (
           <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
           <button
             type='button'
             className='absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
             data-modal-hide='popup-modal'
             onClick={() => {
               setAgree(false);
               onClose();
               setTechstack('');
             }}
           >
             <svg
               className='h-3 w-3'
               aria-hidden='true'
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 14 14'
             >
               <path
                 stroke='currentColor'
                 strokeLinecap='round'
                 strokeLinejoin='round'
                 strokeWidth='2'
                 d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
               />
             </svg>
             <span className='sr-only'>Close modal</span>
           </button>
           <div className='p-4 md:p-5'>
             <p className='text-gray-500 dark:text-gray-400 mb-4'>Select the tech stack:</p>
             <ul className='space-y-4 mb-4'>
               <li>
                 <input
                   type='radio'
                   id='job-1'
                   name='job'
                   value='job-1'
                   className='hidden peer'
                  
                 />
                 <label
                   className={`inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 ${
                     techstack === 'java' ? 'border-green-500 bg-green-100' : ''
                   }`}
                   onClick={() => setTechstack('java')}
                 >
                   <div className='block'>
                     <div className='w-full text-lg font-semibold'>Java</div>
                     <div className='w-full text-gray-500 dark:text-gray-400'>Pure Java project</div>
                   </div>
                   <svg
                     className='w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400'
                     aria-hidden='true'
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 14 10'
                   >
                     <path
                       stroke='currentColor'
                       strokeLinecap='round'
                       strokeLinejoin='round'
                       strokeWidth='2'
                       d='M1 5h12m0 0L9 1m4 4L9 9'
                     />
                   </svg>
                 </label>
               </li>
               <li>
                 <input
                   type='radio'
                   id='job-2'
                   name='job'
                   value='job-2'
                   className='hidden peer'
                 />
                 <label
                   className={`inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 ${
                     techstack === 'python' ? 'border-green-500 bg-green-100' : ''
                   }`}
                   onClick={() => setTechstack('python')}
                 >
                   <div className='block'>
                     <div className='w-full text-lg font-semibold'>Python</div>
                     <div className='w-full text-gray-500 dark:text-gray-400'>Pure Python project</div>
                   </div>
                   <svg
                     className='w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400'
                     aria-hidden='true'
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 14 10'
                   >
                     <path
                       stroke='currentColor'
                       strokeLinecap='round'
                       strokeLinejoin='round'
                       strokeWidth='2'
                       d='M1 5h12m0 0L9 1m4 4L9 9'
                     />
                   </svg>
                 </label>
               </li>
             </ul>
             <button
               className='text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
               onClick={handleContinue}
             >
               Continue
             </button>
           </div>
         </div>
          ) : (
            <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
              <button
                type='button'
                className='absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
                onClick={() => onClose()}
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
              <div className='p-4 text-center md:p-5'>
                <svg
                  className='mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                <h3 className='mb-5 text-base font-normal text-gray-500 dark:text-gray-400'>
                  Only Java and Python projects are supported for now and
                  running any of our features on projects which are not in Java
                  or Python will result in unexpected behaviour.
                </h3>
                <button
                  data-modal-hide='popup-modal'
                  type='button'
                  className='inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800'
                  onClick={handleAgree}
                >
                  Yes, I understand
                </button>
                <button
                  data-modal-hide='popup-modal'
                  type='button'
                  className='ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
                  onClick={() => onClose()}
                >
                  No, cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportProject;
