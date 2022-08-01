//Connection file to mongo db
const mongoose =require("mongoose");


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         });
//         console.log("MongoDB Conected")
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{ 
      
        useUnifiedTopology: true,
        useNewUrlParser: true,
       // useCreateIndex: true,
      
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

// const connectDB = async () => {
    
//       const conn = await mongoose
//       .connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       })
//       .then(() => console.log('DB Connected!'))
//       .catch(err => {
//       console.log(`DB Connection Error: ${err.message}`);
//       });
//   };



module.export = connectDB;