import app from "./app";
import connectToDB from "./utils/db";

//create server
app.listen(process.env.PORT, () => {
  console.log(`The app run on port ${process.env.PORT}`);
  connectToDB;
});
