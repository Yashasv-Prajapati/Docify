// components/PinnedRepositories.tsx

import React from 'react';

import { Repository } from '../../types/index';
import RepositoryCard from './Repository';

interface PinnedRepositoriesProps {
  repositories: Repository[];
}

const PinnedRepositories: React.FC<PinnedRepositoriesProps> = ({
  repositories,
}) => {
  return (
    <div>
      <div className='mb-4 text-white'>
        <h3 className='text-left text-xl font-normal'>All Repositories</h3>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repository={repo} />
        ))}
      </div>
    </div>
  );
};

export default PinnedRepositories;
