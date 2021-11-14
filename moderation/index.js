const express = require("express");

// Create express app
const app = express();

// Body Parser middleware
app.use(express.json());

// Routes

// Listening on Port
const port = 4004;
app.listen(port, () => console.log(`Server is listening on ${port}`));
