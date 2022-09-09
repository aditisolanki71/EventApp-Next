//http://localhost:3000/api/newsletter
import { MongoClient } from"mongodb";

async function connectDatabase() {
   const MONGO_URI = `mongodb+srv://aditiii:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/eventsApp?retryWrites=true&w=majority`;
   const client = await MongoClient.connect(MONGO_URI)
   return client
}

async function insertDocument(client,document) {
   const db = client.db();
   await db.collection("newsletter").insertOne(document);

}
async function handler(req, res) {
   if(req.method === 'POST') {
      const userEmail = req.body.email;
      if(!userEmail || !userEmail.includes("@")) {
         res.status(422).json({ message: "Invalid email address" });
         return;
      }

      //       "mongoDatabase": "lyricaldb",
      //       "mongoUserName": "aditi",
      //       "mongoUserPassword": "NruNqUTV1OPMxTvN"
      let client;   
      try {
         client = await connectDatabase();
      } catch(error) {
         res.status(500).json({ message: "Connecting to the database failed..." });
         return;
      }

      try {
         await insertDocument(client, {email: userEmail });
         client.close();
      } catch(error) {
         res.status(500).json({ message: "Inserting data failed!!!" });
         return;
      }

      console.log("email is",userEmail)
      res.status(201).json({ message: "Signed up" });
   }
   else {
      res.status(200).json({ name: 'John Doe' })
   }
 }
 
 export default handler;