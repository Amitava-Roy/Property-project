const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
//route import
const propertyRoute = require("./routes/property");
const userRoute = require("./routes/user");

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});
app.use("/api", propertyRoute);
app.use("/api", userRoute);
app.use((error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res
    .status(error.statusCode)
    .json({ error: error.message });
});
//ramitava007
//khqHkoFilSuNjk84
const URL = `mongodb://${process.env.user}:${process.env.password}@ac-ubkze8y-shard-00-00.wctuswu.mongodb.net:27017,ac-ubkze8y-shard-00-01.wctuswu.mongodb.net:27017,ac-ubkze8y-shard-00-02.wctuswu.mongodb.net:27017/?ssl=true&replicaSet=atlas-14dg9n-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose
  .connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((value) => {
    app.listen(process.env.PORT || 3000);
  });
