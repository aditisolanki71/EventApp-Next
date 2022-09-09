//http://localhost:3000/api/newsletter
import { MongoClient } from"mongodb";
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
      const MONGO_URI = `mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/eventsApp?retryWrites=true&w=majority`;

      const client = await MongoClient.connect(MONGO_URI)
      const db = client.db();
      await db.collection("newsletter").insertOne({ email: userEmail });

      client.close();
      console.log("email is",userEmail)
      res.status(201).json({ message: "Signed up" });
   }
   else {
      res.status(200).json({ name: 'John Doe' })
   }
 }
 
 export default handler;