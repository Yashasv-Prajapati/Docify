import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import Wrapper from '@/components/wrapper';

export default function Home() {
  return (
    <>
      <Wrapper>
        Hello this is docify
        <Link
          className={buttonVariants({
            size: 'sm',
          })}
          href={`https://github.com/user/installations/{installation_id}/repositories?client_id=${process.env.GITHUB_CLIENT_ID}`}
        >
          Authorize
        </Link>
      </Wrapper>
    </>
  );
}
