 // /api/comment/some event id
 function handler(req,res) {
    const eventId = req.query.eventId;
    console.log("event id is",eventId);
    console.log("req body is",req.body)
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
         text: text
      }
      console.log("new comment is",newComment);
      res.status(200).json({ message: "Added Comment.", comment: newComment })
   }
   if(req.method === 'GET') {
      const dummyComment = [
         {id: "c1", name: "Aditi", text: "First Comment"},
         {id: "c2", name: "Arjun", text: "Second Comment"}
      ];
      res.status(200).json({ comments: dummyComment });
   }
 }
 export default handler;