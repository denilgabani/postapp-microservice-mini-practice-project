const { default: axios } = require("axios");
const express = require("express");

// Intialize app
const app = express();

//Body parser
app.use(express.json());

// Event data store

const events = [];

// Routes

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  events.push({ type, data }); //Store every event that occured

  axios
    .post("http://localhost:4001/events", { type, data })
    .catch((err) => console.error(err));
  axios
    .post("http://localhost:4002/events", { type, data })
    .catch((err) => console.error(err));
  axios
    .post("http://localhost:4003/events", { type, data })
    .catch((err) => console.error(err));
  axios
    .post("http://localhost:4004/events", { type, data })
    .catch((err) => console.error(err));

  res.status(200).send({
    success: true,
  });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

//  Listen port
const port = 4005;
app.listen(port, () => console.log(`Server is listening on ${port}`));
