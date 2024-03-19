import { URLSearchParams } from 'url';
import { notFound } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import getCurrentUser from '@/lib/curr';
import { db } from '@/lib/db';
import SearchableProjects from './components/searchableProjects';
import Avatar from '../dashboard/components/avatar';
import Nav from '../dashboard/components/nav';
const GITHUB_API_BASE_URL = 'https://api.github.com';

async function refresh_access_token(
  refresh_token: string | undefined,
  github_username: string | undefined
) {
  try {
    const uri = 'https://github.com/login/oauth/access_token';

    const response = await axios.post(uri, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    });

    const parsed_data = new URLSearchParams(response.data);
    const new_access_token = parsed_data.get('access_token');
    const new_refresh_token = parsed_data.get('refresh_token');
    const expiry_time_in_seconds = Number(parsed_data.get('expires_in'));

    if (!new_access_token || !new_refresh_token || !expiry_time_in_seconds) {
      return undefined;
    }

    const expiry_time_in_milliseconds = expiry_time_in_seconds * 1000;
    const epoch_time = new Date().getTime() + expiry_time_in_milliseconds;
    const expiry_date_time = new Date(epoch_time);

    await db.user.update({
      where: {
        github_username: github_username,
      },
      data: {
        github_access_token: new_access_token,
        github_refresh_token: new_refresh_token,
        github_access_token_expiry: expiry_date_time,
      },
    });
    return new_access_token;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

// returns and object
// first att is an array of repositories
// second att is the user id of the current user
async function get_repositories(): Promise<
  { state: 'success'; data: any; userId: string , username: string} | { state: 'error' } // if no user
> {
  try {
    const curr = await getCurrentUser();
    if (!curr) {
      console.log('NO token');
      return { state: 'error' };
    }
    let github_access_token = curr.github_access_token;
    const github_expiry_date_time = curr.github_access_token_expiry;

    if (github_expiry_date_time >= new Date()) {
      // if access token is expired
      github_access_token = (await refresh_access_token(
        curr.github_refresh_token,
        curr.github_username
      )) as string;
      if (!github_access_token) {
        console.log('NO toekn');
        return { state: 'error' };
      }
    }

    const requestOptions = {
      headers: {
        Authorization: `token ${github_access_token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Your-App',
        'X-GitHub-Installation-Id': curr.github_installation_id,
      },
      params: {
        type: 'owner',
      },
    };

    const uri = `${GITHUB_API_BASE_URL}/user/repos`;
    const response: AxiosResponse = await axios.get(uri, requestOptions);

    return { state: 'success', data: response.data, userId: curr.id , username: curr.github_username};
  } catch (err) {
    console.log(err);
    return { state: 'error' };
  }
}


export default async function Page() {
  const github_access_token = process.env.GITHUB_ACCESS_TOKEN;

  const res = await get_repositories();
  if (res.state === 'error') {
    notFound();
  }

  
  const { data, userId , username} = res;
  const AvatarComponent = <Avatar />;
  return (
    <div key='1' className='flex h-screen flex-col'>
        <Nav AvatarComponent={AvatarComponent} />
       <SearchableProjects data={data} userId={userId} userName={username}/>
      </div>
  );
}
