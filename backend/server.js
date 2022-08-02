const express=require("express");
const mongoose =require("mongoose");
const app=express();
const dotenv= require("dotenv");
const notes= require('./data/notes');
const userRoutes=require('./routes/userRoutes');
const noteRoutes=require('./routes/noteRoutes');
const  path = require("path");

const { notFound, errorHandler } = require("./middleware/errormiddleware");

//const connectDB=require('./config/db');

dotenv.config();
app.use(express.json());
//connectDB();

//mongoose.connect(process.env.MONGO_URI,{useNewUrlParser : true});

mongoose.connect(process.env.MONGO_URI
    , 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });




app.get('/',(req,res)=>{
    res.send('api is running')});

// app.get('/api/notes',(req,res)=>{
//     res.json(notes);
// });    

// app.get('/api/notes/:id',(req,res)=>{

//     const note=notes.find((n)=> {return n._id ===req.params.id});
//     res.send(note);
// })

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);
// right below routes
// --------------------------deployment------------------------------
 __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
};
// --------------------------deployment------------------------------



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is listening to port ${PORT}`));