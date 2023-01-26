// Use the dotenv package, to create environment variables
const dotenv = require("dotenv").config();
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = 3000;
// Import express, and create a server
const express = require("express");
// Require morgan and body-parser middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
// Have the server use morgan with setting 'dev'
const { client } = require("./db");
const server = express();
// Import cors
const cors = require("cors");
const { apiRouter } = require("./api");
// Have the server use cors()
server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
// Have the server use bodyParser.json()
// Have the server use your api router with prefix '/api'
server.get('/',(req,res)=>{
  res.send('<h1>Welcome to Phenomena</h1>')
})
server.use("/api", apiRouter);
// Import the client from your db/index.js

require("dotenv").config();

server.use("/api", apiRouter);

// Create custom 404 handler that sets the status code to 404.
server.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((req, res, next) => {
  res.status(500).render("500", { error: Error });
});

// Start the server listening on port PORT
// On success, connect to the database
client.connect();
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
