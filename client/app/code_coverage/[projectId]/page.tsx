'use client';

// Import required modules and components
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Table } from 'lucide-react';

import Nav from '@/components/nav';

// Dummy HTML code coverage table string
const dummyCodeCoverageHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Coverage Table</title>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>File</th>
                <th>Lines Covered</th>
                <th>Lines Missed</th>
                <th>Coverage Percentage</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>example.js</td>
                <td>50</td>
                <td>50</td>
                <td>50%</td>
            </tr>
            <tr>
                <td>example2.js</td>
                <td>70</td>
                <td>30</td>
                <td>70%</td>
            </tr>
            <tr>
                <td>example3.js</td>
                <td>80</td>
                <td>20</td>
                <td>80%</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;

interface CodeCoveragePageProps {
  params: { projectId: string };
}

const CodeCoveragePage = ({ params }: CodeCoveragePageProps) => {
  const addTailwindClasses = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elementsToAddClasses = doc.querySelectorAll('table, th, td');

    elementsToAddClasses.forEach((element) => {
      element.classList.add(
        'border',
        'px-4',
        'py-2',
        'border-gray-300',
        'text-center'
      );
    });

    return doc.documentElement.outerHTML;
  };

  const parseHTMLString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Project data
  const id = params.projectId;
  const repoUrl = 'https://github.com/example/repository';
  const codeCoverageHTML = addTailwindClasses(dummyCodeCoverageHTML);

  return (
    <div className='flex h-screen flex-col'>
      <Nav />
      <div className='flex flex-col items-center justify-center p-4'>
        <div className='mb-4'>
          <h1 className='text-center text-2xl font-bold'>
            Project Information
          </h1>
          <hr className='my-4' />
          <p className='text-gray-600'>Project ID: {id}</p>
          <p className='text-gray-600'>Repository URL: {repoUrl}</p>
          <hr className='my-4' />
        </div>
        <div>
          <h2 className='mb-2 flex items-center justify-center text-xl font-bold'>
            <Table size={24} className='mr-2' /> Code Coverage Table
          </h2>
          {parseHTMLString(codeCoverageHTML)}
        </div>
      </div>
    </div>
  );
};

export default CodeCoveragePage;
