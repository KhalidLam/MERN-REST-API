const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Set up express app
const app = express();

// Connect to mongodb
mongoose.connect("mongodb://localhost/userdb");
mongoose.Promise = global.Promise;

// Add static assets
// app.use(express.static("public"));

// Add bodyParser middleware
app.use(bodyParser.json());

// Add Cors middleware
app.use(cors());

// Initialize routes
app.use("/api", require("./routes/api"));

// Error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ ...err });
});

// Listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests...");
});
