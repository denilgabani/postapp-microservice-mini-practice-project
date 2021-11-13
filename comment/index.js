const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { default: axios } = require("axios");

const app = express();

// Body Parser
app.use(express.json());

// CORS enabled
app.use(cors());

// Data
/** Format
 * {
 *      postId: [{id:commentId, comment: content of comment},
 *                   {id:commentId, comment: content of comment}]]
 * }
 *
 */
let comments = {};

// Routes

app.post("/posts/:postId/comments", (req, res) => {
  const commentId = crypto.randomBytes(4).toString("hex"); //Generate random Id
  console.log(req.params.postId);
  const commentsArr = comments[req.params.postId] || [];
  commentsArr.push({
    id: commentId,
    comment: req.body.content,
  });

  comments[req.params.postId] = commentsArr;

  axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        postId: req.params.postId,
        id: commentId,
        comment: req.body.content,
      },
    })
    .catch((err) => console.log(err));

  res.status(201).send({
    success: true,
  });
});

app.get("/posts/:postId/comments", (req, res) => {
  const specificComments = comments[req.params.postId] || [];
  res.status(200).send({
    success: true,
    data: specificComments,
  });
});

app.post("/events", (req, res) => {
  console.log(`Event Received: ${req.body.type}`);
  res.status(200).send({
    success: true,
  });
});

// Port
const port = 4002;
app.listen(port, () => console.log(`Server is listening on ${port}`));
