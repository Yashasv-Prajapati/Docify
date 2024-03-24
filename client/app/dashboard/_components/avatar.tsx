import Image from 'next/image';

import getCurrentUser from '@/lib/curr';

export default async function Avatar() {
  const curr_user = await getCurrentUser();

  return (
    <Image
      alt='Avatar'
      className='rounded-full border'
      height='32'
      src={curr_user?.avatar_url || '/avatar.svg'}
      style={{
        aspectRatio: '32/32',
        objectFit: 'cover',
      }}
      width='32'
    />
  );
}
