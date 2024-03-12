import React from 'react';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

function Page({ searchParams }: PageProps) {
  const code = searchParams.code;

  return <div>Got code {code}</div>;
}

export default Page;
