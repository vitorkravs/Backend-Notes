import mongoose from "mongoose";

const { MONGODB_USER, MONGODB_PASSWORD } = process.env;

const dbConfig = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@notes.9nxefmp.mongodb.net/?retryWrites=true&w=majority`;

const dbConnection = mongoose.connect(dbConfig);

dbConnection
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

export default dbConnection;
