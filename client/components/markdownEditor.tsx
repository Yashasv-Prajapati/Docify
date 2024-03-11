'use client';

import { FC, useEffect, useState } from 'react';
import hljs from 'highlight.js';

import 'highlight.js/styles/tokyo-night-dark.css';

import DOMpurify from 'isomorphic-dompurify';
import { Columns2, Download, Save } from 'lucide-react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const MarkdownEditor: FC = () => {
  const storedMarkdown = localStorage.getItem('stored-markdown');
  const [markdown, setMarkdown] = useState(
    storedMarkdown ? storedMarkdown : '# Markdown Editor'
  );
  const [showPreview, setShowPreview] = useState(true);

  function handleMarkdown(markdown: string) {
    setMarkdown(markdown);
    localStorage.setItem('stored-markdown', markdown);
  }

  async function handleSave(markdown: string) {
    const apiUrl = ''; // Enter the api url here
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: markdown,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function handleDownload(markdown: string) {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <div className='my-8'>
      <div className='flex items-center justify-center bg-gray-200 px-4 py-2'>
        <div className='ml-12 grow text-center text-2xl font-bold'>
          Markdown Editor
        </div>
        <div className='flex space-x-2'>
          <Columns2
            onClick={() => setShowPreview(!showPreview)}
            className='size-[20px] cursor-pointer transition-colors duration-200 hover:bg-gray-300'
          />
          <Save
            onClick={() => handleSave(markdown)}
            className='size-[20px] cursor-pointer transition-colors duration-200 hover:bg-gray-300'
          />
          <Download
            onClick={() => handleDownload(markdown)}
            className='size-[20px] cursor-pointer transition-colors duration-200 hover:bg-gray-300'
          />
        </div>
      </div>

      <div className={`${showPreview && 'grid grid-cols-2'} bg-gray-100`}>
        <Editor
          markdown={markdown}
          handleMarkdown={handleMarkdown}
          showPreview={showPreview}
        />
        {showPreview && <Preview markdown={markdown} />}
      </div>
    </div>
  );
};

interface EditorProps {
  markdown: string;
  handleMarkdown: (markdown: string) => void;
  showPreview: boolean;
}

const Editor: FC<EditorProps> = ({ markdown, handleMarkdown, showPreview }) => {
  return (
    <div className={`${showPreview && 'border-r-4'} border-gray-300`}>
      <div className='text-gray-1000 w-full bg-gray-200 p-4 text-lg uppercase tracking-wider'>
        Edit
      </div>
      <textarea
        className='box-border h-[400px] w-full resize-none bg-gray-100 p-6 text-gray-800 outline-none'
        onChange={(e) => handleMarkdown(e.target.value)}
        value={markdown}
      />
    </div>
  );
};

interface PreviewProps {
  markdown: string;
}

const Preview: FC<PreviewProps> = ({ markdown }) => {
  const [parsedMarkdown, setParsedMarkdown] = useState('');
  useEffect(() => {
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      })
    );
    const parse = async () => {
      const parsed = DOMpurify.sanitize(await marked.parse(markdown));
      setParsedMarkdown(parsed.toString());
    };
    parse();
  }, [markdown]);

  return (
    <div>
      <div className='w-full bg-gray-200 p-4 text-lg uppercase tracking-wider text-gray-800'>
        Preview
      </div>
      <div className='h-[400px] overflow-y-auto'>
        <div
          className='prose size-full break-words bg-gray-100 p-6 prose-pre:bg-[#1a1b26]'
          dangerouslySetInnerHTML={{
            __html: parsedMarkdown,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
