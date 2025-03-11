import { connectDB } from "@/libs/connectDB"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    try{
        const poll = await req.json()
        const db = await connectDB();
        const pollCollection = await db.collection('polls');
        const result = await pollCollection.insertOne(poll);
        return NextResponse.json(result)
    }
    catch(err){
        return NextResponse.json({error: err.message}, {status:500})
    }
}