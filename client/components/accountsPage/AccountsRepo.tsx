// pages/index.tsx or pages/your-page.tsx

import React from 'react';

import { Repository } from '../../types/index';
import GridRepositories from './GridRepositories';

const repositories: Repository[] = [
  // Replace these with your actual repository data
  { name: 'fb-clone-f', language: 'JavaScript', stars: 2, isPublic: true },
  { name: 'Amex-collab', language: 'JavaScript', stars: 2, isPublic: true },
  { name: 'Amex-collab', language: 'JavaScript', stars: 2, isPublic: true },
  { name: 'Amex-collab', language: 'JavaScript', stars: 2, isPublic: true },
  { name: 'Amex-collab', language: 'JavaScript', stars: 2, isPublic: true },
  { name: 'Amex-collab', language: 'JavaScript', stars: 2, isPublic: true },
  // Add more repositories as needed
];

const ProfilePage: React.FC = () => {
  return (
    <div className='container mx-auto p-4 '>
      <GridRepositories repositories={repositories} />
      {/* Other components */}
    </div>
  );
};

export default ProfilePage;
