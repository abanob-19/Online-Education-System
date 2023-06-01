// External variables
const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require('dotenv').config({path: '../../.env'});
require("dotenv").config({ path: __dirname + "/./../../.env" });
//------------------------------------------------------------------------------------------------------
require("dotenv").config();

//dotenv.config({path: '../.env'});

const MongoURI = process.env.MONGO_URI;

//App variables
const app = express();
const port = process.env.PORT || "8000";
const user = require("./models/userModel");
// #Importing the userController
const userController = require("./controllers/userController");
const cors = require("cors");
app.use(cors());

// configurations
// Mongo DB
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin", require("./routes/adminRoutes"));
app.use("/instructor", require("./routes/instructorRoutes"));
app.use("/guest", require("./routes/guestRoutes"));
app.use("/corporateTrainee", require("./routes/corporateTraineeRoutes"));
app.use("/individualTrainee", require("./routes/individualTraineeRoutes"));
app.use("/", require("./routes/userRoutes")); 
