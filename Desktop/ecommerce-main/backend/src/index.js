import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js"




dotenv.config({
      path: './.env',
      quiet: true,
})


app.get("/", (req, res) => {
     res.status(201).send("<h1>we will not let down your server</h1>")
})




connectDB()  // connectDB returns a promise so we need to use .then and .catch
.then(() =>{

      app.on("error", (error) => {
           console.log("Error is: ",  error);
           throw error
      })
      
      
      
     app.listen(process.env.PORT || 8000, () => {
         console.log(`Server is running at port: ${process.env.PORT}`);
     })
})
.catch((err) => {
     console.log("mongoDB connection failed !! ", err);
})


