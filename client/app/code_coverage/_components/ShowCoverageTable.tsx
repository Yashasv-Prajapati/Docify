'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ShowCoverageTableProps {
  htmlTable: string;
}

const addTailwindClasses = (markdownString: string) => {
  const lines = markdownString.split('\n');
  const heading = lines[0].replace(/^#+\s*/, ''); // Remove leading #'s and whitespace
  let html = '<h2 class="text-2xl font-bold mb-4">' + heading + '</h2>\n'; // Assuming the first line is the header

  // Convert table header
  html += '<div class="overflow-x-auto"><table class="w-full table-auto">\n<thead>\n<tr class="bg-gray-200">';
  const headers = lines[2].split('|').map(header => header.trim().replace(/\*/g, ''));
  headers.forEach(header => {
    if (header !== '') {
      html += `<th class="px-4 py-2">${header}</th>\n`;
    }
  });
  html += '</tr>\n</thead>\n<tbody>\n';

  // Convert table rows
  for (let i = 4; i < lines.length; i++) {
    const cells = lines[i].split('|').map(cell => cell.trim());
    html += '<tr>';
    cells.forEach(cell => {
      if (cell !== '') {
        html += `<td class="border px-4 py-2">${cell}</td>\n`;
      }
    });
    html += '</tr>\n';
  }
  html += '</tbody>\n</table></div>';

  return html;

};

const parseHTMLString = (htmlString: string) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export const ShowCoverageTable = ({
  htmlTable,
}: ShowCoverageTableProps): React.JSX.Element => {
  console.log(htmlTable);
  const codeCoverageHTML = parseHTMLString(addTailwindClasses(htmlTable));
  return <>{codeCoverageHTML}</>;
};

export default ShowCoverageTable;
