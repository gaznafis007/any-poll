import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const connectDB = async() =>{
    if(db){
        return db
    }else{
        const uri = ``;
        const client = new MongoClient(uri, {
            serverApi:{
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
        await client.connect()
        db = client.db('any-poll-database')
        return db
    }
}