import { connectDB } from "@/libs/connectDB"
import { NextResponse } from "next/server"

export const GET = async (req) =>{
    try{
        const db = await connectDB();
        const searchParams = new URL(req.url)
        const pollId = searchParams.get('pollId');
        const query = {pollId: pollId};
        const commentCollection = await db.collection('comments');
        const result = await commentCollection.find(query).toArray();
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error:err.message}, {status: 500})
    }
}

export const POST = async(req) =>{
    try{
        const db = await connectDB();
        const commentCollection = await db.collection('comments');
        const comment = await req.json();
        const result = await commentCollection.insertOne(comment);
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}