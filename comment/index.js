const express = require("express");
const crypto = require("crypto");

const app = express();

// Body Parser
app.use(express.json());

// Data
/** Format
 * {
 *      postId: {id:commentId, comment: content of comment}
 * }
 *
 */
let comments = {};

// Routes

app.post("/posts/:postId/comments", (req, res) => {
  const commentId = crypto.randomBytes(4).toString("hex"); //Generate random Id
  comments[req.params.postId] = {
    id: commentId,
    post: req.body.content,
  };

  res.status(201).send({
    success: true,
  });
});

app.get("/posts/:postId/comments", (req, res) => {
  res.status(200).send({
    success: true,
    data: comments,
  });
});

// Port
const port = 4002;
app.listen(port, () => console.log(`Server is listening on ${port}`));
