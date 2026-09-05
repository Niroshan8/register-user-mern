const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");

// Create an instance of the Express application
const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins. This is important for enabling communication between the client and server, especially when they are hosted on different domains or ports.
app.use(cors());
// Parse incoming JSON requests. mean that the server can accept JSON data in the request body and automatically parse it into a JavaScript object, making it easier to work with the data in your route handlers.
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email }) 
    .then((user) => {
      if (user) {
        res.json("Already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

// listen for incoming requests on port 3001. When the server starts successfully, it logs a message indicating that it's running and listening for requests.
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
