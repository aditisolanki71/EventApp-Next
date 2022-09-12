import { MongoClient } from 'mongodb';

export async function connectDatabase() {
   const MONGO_URI = `mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/eventsApp?retryWrites=true&w=majority`;

   console.log("mongourl",MONGO_URI);

  const client = await MongoClient.connect(MONGO_URI);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}
