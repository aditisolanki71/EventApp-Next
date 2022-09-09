//http://localhost:3000/api/newsletter
export default function handler(req, res) {
   if(req.method === 'POST') {
      const userEmail = req.body.email;
      if(!userEmail || !userEmail.includes("@")) {
         res.status(422).json({ message: "Invalid email address" });
         return;
      }
      console.log("email is",userEmail)
      res.status(201).json({ message: "Signed up" });
   }
   else {
      res.status(200).json({ name: 'John Doe' })
   }
 }
 