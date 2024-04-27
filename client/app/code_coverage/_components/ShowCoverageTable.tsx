'use client'
import React from "react";

interface ShowCoverageTableProps{
    htmlTable: string;
}

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


export const ShowCoverageTable = ({htmlTable}:ShowCoverageTableProps): React.JSX.Element => {
    const codeCoverageHTML = addTailwindClasses(htmlTable);
    const parsedHTML = parseHTMLString(codeCoverageHTML);
    return (
        <>
            {parsedHTML}
        </>
    );
};

export default ShowCoverageTable;