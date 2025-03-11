import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const connectDB = async() =>{
    if(db){
        return db
    }else{
        const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASS}@cluster0.d1c0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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