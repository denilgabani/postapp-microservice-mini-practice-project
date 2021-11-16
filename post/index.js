const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

// Body Parser
app.use(express.json());

// CORS enabled
app.use(cors());

// Data
/** Format
 * {
 *      postId: {id:postId, post: content of post}
 * }
 *
 */
let posts = {};

// Routes

app.post("/posts", (req, res) => {
  const postId = crypto.randomBytes(4).toString("hex"); //Generate random Id
  posts[postId] = {
    id: postId,
    post: req.body.content,
  };

  axios
    .post("http://event-bus-cluster-ip:6005/events", {
      type: "PostCreated",
      data: { id: postId, title: req.body.content },
    })
    .catch((err) => console.log(err));

  res.status(201).send({
    success: true,
  });
});

app.get("/posts", (req, res) => {
  res.status(200).send({
    success: true,
    data: posts,
  });
});

app.post("/events", (req, res) => {
  console.log(`Event Received: ${req.body.type}`);
  res.status(200).send({
    success: true,
  });
});

// Port
const port = 4001;
app.listen(port, () => {
  console.log("v0.0.8");
  console.log(`Server is listening on ${port}`);
});
