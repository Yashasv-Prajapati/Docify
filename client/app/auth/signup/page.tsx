import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

import { Navbar } from '../../../components/index';
import axios from 'axios';

function Signup() {
  const appId = process.env.GITHUB_APP_ID;
  // const installationUrl = `https://github.com/apps/docify-wiki/installations/new?target_id=${appId}&target_type=app&redirect_if_installed=true`;

  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = process.env.GITHUB_REDIRECT_URI;
  const scope = 'user'; // Add additional scopes as needed
  console.log(client_id, redirect_uri, scope);
  const installationUrl =`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`


  return (
    <div className='overflow-hidden bg-[#1b222f]'>
      <Navbar />
      <div className='flex justify-between'>
        <div className='flex w-1/2 flex-col justify-center border-2 border-transparent p-6'>
          <h1 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-white md:text-3xl lg:text-4xl'>
            Let&apos;s build something new.
          </h1>
          <div className='mb-16 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl xl:px-48 '>
            To get the insights, import an existing Git Repository.
          </div>
          <svg
            className='me-2 size-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
              clipRule='evenodd'
            />
          </svg>
          <Link
            className={buttonVariants({
              size: 'sm',
            })}
            target='_blank'
            rel='noreferrer noopener'
            href={installationUrl}
          >
            Sign in with Github
          </Link>
        </div>
        <div>
          <img
            src='/cover.png'
            // width={20}
            // height={40}
            alt='hero_cover'
            className='relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover sm:h-[500px]'
          />
          <a href='#explore'>
            <div className=' relative z-10 mt-[-50px] flex w-full  justify-end sm:mt-[-70px] '>
              <span className='pr-11 '>
                <span className='relative z-10 mt-[-50px] flex w-min  justify-end rounded-full  bg-gradient-to-r from-[#250b47] to-[#2a0670] sm:mt-[-70px]'>
                  {/* <img
              src="/stamp.png"
              alt="stamp"
              className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
            /> */}
                  {/* <Lottie
                    animationData={animationData}
                    className='size-[100px] object-contain sm:size-[155px]'
                  /> */}
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
