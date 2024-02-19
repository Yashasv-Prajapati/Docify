import { FC } from 'react';

import { cn } from '@/lib/utils';

interface WrapperProps {
  className?: string;
  children?: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
