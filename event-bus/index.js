const express = require("express");

// Intialize app
const app = express();

//Body parser
app.use(express.json());

//  Listen port
const port = 4005;
app.listen(port, () => console.log(`Server is listening on ${port}`));
