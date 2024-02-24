// components/PinnedRepositories.tsx

import React from 'react';
import RepositoryCard from './Repository';
import { Repository } from '../../types/index';

interface PinnedRepositoriesProps {
  repositories: Repository[];
}

const PinnedRepositories: React.FC<PinnedRepositoriesProps> = ({ repositories }) => {
  return (
    <div>
      <div className="text-white mb-4">
        <h3 className="text-xl font-normal text-left">All Repositories</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repository={repo} />
        ))}
      </div>
    </div>
  );
};

export default PinnedRepositories;
