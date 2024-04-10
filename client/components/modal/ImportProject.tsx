'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { createProjectSchema } from '@/lib/validations/project';

interface ProfileEditProps {
  isVisible: boolean;
  onClose: () => void;
  url: string;
  repository_name: string;
  userId: string;
  testing_dir: string;
}

function ImportProject({
  isVisible,
  onClose,
  url,
  repository_name,
  userId,
  testing_dir,
}: ProfileEditProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agree, setAgree] = useState(false);
  const [techstack, setTechstack] = useState('');
  const router = useRouter();
  // console.log('teckkkkkk :', techstack);

  useEffect(() => {
    if (!isVisible) {
      setAgree(false);
      setTechstack('');
    }
  }, [isVisible]);

  const handleAgree = () => {
    setAgree(true);
    // Perform any additional actions needed when user agrees
  };

  const handleContinue = async () => {
    // CALL THE API HERE BASED ON THE TECKSTACK {java,python}
    setIsLoading(true);

    try {
      const body = createProjectSchema.parse({
        url,
        repository_name,
        userId,
        testing_dir,
        project_type: techstack,
      });
      const response = await axios.post('/api/project', body, {
        withCredentials: true,
      });

      const truncatedRepoName =
        repository_name.length > 20
          ? repository_name.substring(0, 20) + '...'
          : repository_name;

      if (response.data.success) {
        toast.success(`Project '${truncatedRepoName}' imported successfully`);
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(`Project '${truncatedRepoName}' already exists`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error('Something went wrong');
        }

        return toast.error(error.response?.data);
      }
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      setAgree(false);
      onClose();
    }
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
                className='absolute end-2.5 top-3 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
                onClick={() => {
                  setAgree(false);
                  onClose();
                  setTechstack('');
                }}
              >
                <svg
                  className='size-3'
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
                <p className='mb-4 text-gray-500 dark:text-gray-400'>
                  Select the tech stack:
                </p>
                <ul className='mb-4 space-y-4'>
                  <li>
                    <input
                      type='radio'
                      id='job-1'
                      name='job'
                      value='job-1'
                      className='peer hidden'
                    />
                    <label
                      className={`inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-900 hover:bg-gray-100 hover:text-gray-900 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:peer-checked:text-blue-500 ${
                        techstack === 'java'
                          ? 'border-green-500 bg-green-100'
                          : ''
                      }`}
                      onClick={() => setTechstack('java')}
                    >
                      <div className='block'>
                        <div className='w-full text-lg font-semibold'>Java</div>
                        <div className='w-full text-gray-500 dark:text-gray-400'>
                          Pure Java project
                        </div>
                      </div>
                      <svg
                        className='ms-3 size-4 text-gray-500 dark:text-gray-400 rtl:rotate-180'
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
                      className='peer hidden'
                    />
                    <label
                      className={`inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-900 hover:bg-gray-100 hover:text-gray-900 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:peer-checked:text-blue-500 ${
                        techstack === 'python'
                          ? 'border-green-500 bg-green-100'
                          : ''
                      }`}
                      onClick={() => setTechstack('python')}
                    >
                      <div className='block'>
                        <div className='w-full text-lg font-semibold'>
                          Python
                        </div>
                        <div className='w-full text-gray-500 dark:text-gray-400'>
                          Pure Python project
                        </div>
                      </div>
                      <svg
                        className='ms-3 size-4 text-gray-500 dark:text-gray-400 rtl:rotate-180'
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
                  className='inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={handleContinue}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='size-6 animate-spin text-zinc-500' />
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
              <button
                type='button'
                className='absolute end-2.5 top-3 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
                onClick={() => onClose()}
              >
                <svg
                  className='size-3'
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
                  className='mx-auto mb-4 size-12 text-gray-400 dark:text-gray-200'
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
