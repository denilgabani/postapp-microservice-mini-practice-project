const express = require("express");
const crypto = require("crypto");

const app = express();

// Body Parser
app.use(express.json());

// Data
/** Format
 * {
 *      postId: {Id:postId, post: content of post}
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

// Port
app.listen(4001, () => console.log("Server is listening on 4001"));
