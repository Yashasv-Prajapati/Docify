'use client';

import { FC, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import { useLocalStorage } from 'usehooks-ts';

import 'highlight.js/styles/tokyo-night-dark.css';

import axios from 'axios';
import DOMpurify from 'isomorphic-dompurify';
import { Columns2, CookingPot, Download, Save } from 'lucide-react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface MarkdownEditorProps {
  github_access_token: string;
  github_username: string;
  repo: string;
  content: string;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({
  github_access_token,
  github_username,
  repo,
  content,
}) => {
  const [value, setValue, removeValue] = useLocalStorage('test-key', content);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleMarkdown(markdown: string) {
    setValue(markdown);
  }

  async function handleSave() {
    setIsLoading(true);
    const branch_name = process.env.BRANCH_NAME + '-' + Date.now();
    const apiUrl = `https://api.github.com/repos/${github_username}/${repo}/contents/README.md?ref=${branch_name}`;
    try {
      const currentFile = await axios.get(apiUrl, {
        headers: {
          Authorization: `token ${github_access_token}`,
        },
      });

      const response = await axios.put(
        apiUrl,
        {
          message: 'Docify modified README.md',
          branch: 'docify',
          content: Buffer.from(value).toString('base64'),
          sha: currentFile.data.sha,
          committer: {
            name: 'docify[bot]',
            email: `${process.env.GITHUB_APP_ID}+docify[bot]@users.noreply.github.com`,
          },
        },
        {
          headers: {
            Authorization: `token ${github_access_token}`,
          },
        }
      );
      console.log('GitHub API response:', response.data);
      toast.success('Commited successfully 🎉. Check branch docify');
    } catch (error) {
      console.log('GitHub API error:', error);
      toast.error('Sorry this sucks 🥺');
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownload() {
    const blob = new Blob([value], { type: 'text/markdown' });
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
      <div className='my-4 flex items-center justify-center bg-gray-200 px-4 py-2'>
        <div className='ml-12 grow text-center text-2xl font-bold'>
          Markdown Editor
        </div>
        <div className='flex space-x-2'>
          <Columns2
            onClick={() => setShowPreview(!showPreview)}
            className='size-[20px] cursor-pointer transition-colors duration-200 hover:bg-gray-300'
          />
          <Download
            onClick={() => handleDownload()}
            className='size-[20px] cursor-pointer transition-colors duration-200 hover:bg-gray-300'
          />
        </div>
      </div>

      <div className={`${showPreview && 'grid grid-cols-2'} bg-gray-100`}>
        <Editor
          markdown={value}
          handleMarkdown={handleMarkdown}
          showPreview={showPreview}
        />
        {showPreview && <Preview markdown={value} />}
      </div>
      <div className='m-4 flex justify-center'>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Commiting changes...' : 'Commit changes'}
        </Button>
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
          className='prose prose-pre:bg-[#1a1b26] size-full break-words bg-gray-100 p-6'
          dangerouslySetInnerHTML={{
            __html: parsedMarkdown,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
