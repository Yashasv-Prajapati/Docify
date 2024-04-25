import { FC } from 'react';

import getCurrentUser from '@/lib/curr';
import { searchParamsEditorSchema } from '@/lib/validations/params';
import MarkdownEditor from '@/components/markdownEditor';

import Avatar from '../dashboard/_components/avatar';
import Nav from '../dashboard/_components/nav';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const { github_access_token, github_username } = currentUser;
  const { repo, content } = searchParamsEditorSchema.parse(searchParams);

  const AvatarComponent = <Avatar />;
  return (
    <div className='my-4 flex h-screen flex-col'>
      <Nav AvatarComponent={AvatarComponent} />
      <MarkdownEditor
        github_access_token={github_access_token}
        github_username={github_username}
        repo={repo}
        content={content}
      />
    </div>
  );
};

export default Page;
