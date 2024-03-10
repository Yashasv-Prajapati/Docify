import * as cheerio from 'cheerio';
import { markdownTable } from 'markdown-table';

// Convert coverage html to markdown
// Returns markdown string containing the first h1 text and
// the first table in the html string
// runs on the server
export function coverageToMd(htmlStr: string) {
  const $ = cheerio.load(htmlStr);
  const heading = $('h1')
    .first()
    .contents()
    .map(function () {
      return $(this).text().trim();
    })
    .get()
    .join(' ');

  const tableElement = $('table').first();
  const matrix: string[][] = [];
  tableElement
    .find('tr')
    .each((rowIndex: number, rowElement: cheerio.Element) => {
      const row: string[] = [];
      $(rowElement)
        .find('th, td')
        .each((_, colElement: cheerio.Element) => {
          if (rowIndex === 0) {
            row.push(
              `**${$(colElement)
                .text()
                .trim()
                .replace(/^\w/, (ch) => ch.toUpperCase())}**`
            );
          } else {
            row.push($(colElement).text().trim());
          }
        });
      matrix.push(row);
    });

  const table = markdownTable(matrix, { align: 'c' });

  return `## ${heading}\n\n${table}`;
}
