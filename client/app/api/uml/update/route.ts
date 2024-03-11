'use server';
import { NextRequest,NextResponse } from "next/server";
//const path = require('path');
import path from 'path';

import { z } from 'zod';

import { db } from '@/lib/db';
import { MarkdownFileSchema } from '@/lib/validations/md';
import { Prisma } from "@prisma/client";
const parentDir = path.resolve(__dirname, '..','..','..','..','..');//now we are pointing to the repository root
type ResponseData={
    message:String
}

export async function PUT(req: NextRequest) {
    // const imgPath = req.body.imgPath;//this will be the github url for the image
    try{
    const data=await req.json();
    const url=data.url
    const imgPath=parentDir+'/assets/umls/pirocomder_test2.png';
    // const author=data.username
    // const project=data.reponame
    //get the string from prisma db
    const { authorId, projectId } = MarkdownFileSchema.parse(data);//the data needs to have a dummy content
    const md=await db.markdownFile.findFirst({
        where:{
            // id: 'some-id', // Replace 'some-id' with the actual id value
            authorId:authorId,
            projectId:projectId,
        },
    })
    var content=md?.content
    console.log(content)
    content+=`\n![alt txt](${url})`
    const updateMd=await db.markdownFile.update({
        where:{
            id:md?.id,
        },
        data:{
            content:content
        }
    })
    return NextResponse.json({message:'Successfully appended the image to the markdown file'},{status:200})
    }
    catch(err){
        return NextResponse.json({message:`Error occured while adding the uml to md file : ${err}`})
    }
}