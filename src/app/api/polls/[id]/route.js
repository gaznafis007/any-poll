import { connectDB } from "@/libs/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) =>{
    try{
        const {id} = await params;
        const db = await connectDB();
        const pollCollection = await db.collection('polls');
        const query = {_id: new ObjectId(id)}
        const result = await pollCollection.findOne(query);
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}