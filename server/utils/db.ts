const mongoose = require("mongoose"); // Import Mongoose library

// Assuming you have a MongoDB connection string stored in an environment variable named "DB_URL"
const dbUrlString = process.env.DB_URL;

// Async function to connect to MongoDB
const connectToDB = async () => {
  try {
    // Connecting to the MongoDB database using Mongoose
    await mongoose.connect(dbUrlString);

    // If connection is successful, log a success message
    console.log(`Database connected with ${mongoose.connection.host}`);
  } catch (error) {
    // If there's an error during connection, log the error message
    console.log(error.message);
  }
};

// Calling the function to establish the connection
export default connectToDB();
