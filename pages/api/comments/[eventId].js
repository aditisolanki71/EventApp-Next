 // /api/comment/some event id
 import { MongoClient } from"mongodb";
 
 async function handler(req,res) {
    const eventId = req.query.eventId;
    console.log("event id is",eventId);
    console.log("req body is",req.body)

    const MONGO_URI = `mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/eventsApp?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(MONGO_URI);

    if(req.method === 'POST') {
      //add server-side validation
      const { email, name, text } = req.body;
      if(!email.includes("@") || !name || name.trim() === '' || !text || text.trim() === '') {
         res.status(422).json({ message: "Invalid Input" });
         return;
      }
      console.log(email,name,text);
      const newComment = {
         id: new Date().toISOString(),
         email: email,
         name: name,
         text: text,
         eventId: eventId
      }
      console.log("new comment is",newComment);
      const db = client.db();
      const result = await db.collection("comments").insertOne(newComment);
      console.log("Result is",result);
      newComment.id = result.insertedId;
      res.status(200).json({ message: "Added Comment.", comment: newComment })
   }
   if(req.method === 'GET') {
      // const dummyComment = [
      //    {id: "c1", name: "Aditi", text: "First Comment"},
      //    {id: "c2", name: "Arjun", text: "Second Comment"}
      // ]; const db = client.db();
      const db = client.db();
      const result = await db.collection("comments").find().sort().toArray();
      console.log("result is",result)
      res.status(200).json({ comments: result });
   }

   client.close();
 
 }
 export default handler;