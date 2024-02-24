// components/RepositoryCard.tsx

import { Repository } from '../../types/index';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <div className='rounded-md bg-gray-800 p-4 text-white '>
      <div className='mb-2 flex items-center justify-between'>
        <h5 className='bg-gradient-to-r from-sky-400 to-[#8e29f3] bg-clip-text text-lg font-bold text-transparent'>
          {repository.name}
        </h5>
        <span className='rounded-xl border-2 border-gray-600 pl-2 pr-2 text-sm text-gray-500'>
          {repository.isPublic ? 'Public' : 'Private'}
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='flex items-center gap-2'>
        <svg
          className=' h-4 w-4 text-gray-400'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M11 6.5h2M11 18h2m-7-5v-2m12 2v-2M5 8h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1Zm0 12h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1Zm12 0h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2a1 1 0 0 0-1 1v2c0 .6.4 1 1 1Zm0-12h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2a1 1 0 0 0-1 1v2c0 .6.4 1 1 1Z'
          />
        </svg>
        <span className=' text-xs text-gray-400'>{repository.language}</span>
        </span>
        <span className='flex items-center '>
          <svg
            className='h-4 w-4 text-yellow-300 '
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z' />
          </svg>

          <span className='ml-1 text-xs'>{repository.stars}</span>
        </span>
      </div>
    </div>
  );
};

export default RepositoryCard;
