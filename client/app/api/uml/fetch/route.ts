import { NextApiRequest,NextApiResponse } from "next";
import path from "path";
import fs from "fs";
const parentDir = path.resolve(__dirname, '..','..','..','..','..');//now we are pointing to the repository root

type ResponseData={
    message:String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //open a file in the data folder
  //the file will be in image format
  const username=req.body.username;  
  const reponame=req.body.reponame;
  const data = fs.readFileSync(parentDir + `/uml_py/data/${username}${reponame}.jpeg`,'utf8'); 
  return res.status(200).json({ message: data });
}