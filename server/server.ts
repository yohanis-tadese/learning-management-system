import app from "./app";

//create server
app.listen(process.env.PORT, () => {
  console.log(`The app run on port ${process.env.PORT}`);
});
