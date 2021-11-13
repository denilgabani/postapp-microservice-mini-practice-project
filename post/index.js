const express = require("express");

const app = express();

// Body Parser
app.use(express.json());

// Routes

// Port
app.listen(4001, () => console.log("Server is listening on 4001"));
