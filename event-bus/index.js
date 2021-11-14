const { default: axios } = require("axios");
const express = require("express");

// Intialize app
const app = express();

//Body parser
app.use(express.json());

// Routes

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  axios.post("http://localhost:4001/events", { type, data });
  axios.post("http://localhost:4002/events", { type, data });
  axios.post("http://localhost:4003/events", { type, data });
  axios.post("http://localhost:4004/events", { type, data });

  res.status(200).send({
    success: true,
  });
});

//  Listen port
const port = 4005;
app.listen(port, () => console.log(`Server is listening on ${port}`));
