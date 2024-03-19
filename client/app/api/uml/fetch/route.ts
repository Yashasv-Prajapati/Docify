'use server';

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const parentDir = path.resolve(__dirname, '..', '..', '..', '..', '..'); //now we are pointing to the repository root

type ResponseData = {
  message: String;
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  //open a file in the data folder
  //the file will be in image format
  try {
    const data = await req.json();
    const username = data.username;
    const reponame = data.reponame;
    const fileData = fs.readFileSync(
      parentDir + `/uml_py/data/${username}_${reponame}.jpeg`,
      'utf8'
    );
    return NextResponse.json({ message: fileData }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: `Error occured while fetching the uml image : ${err}`,
    });
  }
}
