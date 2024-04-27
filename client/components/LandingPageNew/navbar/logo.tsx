
import Image from "next/image";
import Link from 'next/link';

const Logo = () => {
    return (<div>
        <Link className='flex items-center gap-2 text-lg font-semibold' href='#'>
            <FrameIcon className='size-6' />
            <span className='ml-1 text-xl'>Docify</span>
        </Link>
    </div>);
}
function FrameIcon(props: React.SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <line x1='22' x2='2' y1='6' y2='6' />
            <line x1='22' x2='2' y1='18' y2='18' />
            <line x1='6' x2='6' y1='2' y2='22' />
            <line x1='18' x2='18' y1='2' y2='22' />
        </svg>
    );
}

export default Logo;