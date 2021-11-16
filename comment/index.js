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
 *      postId: [{id:commentId, comment: content of comment, status: 'pending'},
 *                   {id:commentId, comment: content of comment, status: 'pending'}]]
 * }
 *
 */
let commentsByPostId = {};

// Routes

app.post("/posts/:postId/comments", (req, res) => {
  const commentId = crypto.randomBytes(4).toString("hex"); //Generate random Id

  const postId = req.params.postId;
  const comment = req.body.content;
  const commentsArr = commentsByPostId[postId] || [];
  const status = "pending";

  commentsArr.push({
    id: commentId,
    comment,
    status,
  });

  commentsByPostId[postId] = commentsArr;

  axios
    .post("http://event-bus-cluster-ip:6005/events", {
      type: "CommentCreated",
      data: {
        postId,
        id: commentId,
        comment,
        status,
      },
    })
    .catch((err) => console.log(err));

  res.status(201).send({
    success: true,
  });
});

app.get("/posts/:postId/comments", (req, res) => {
  const specificComments = commentsByPostId[req.params.postId] || [];

  res.status(200).send({
    success: true,
    data: specificComments,
  });
});

app.post("/events", (req, res) => {
  console.log(`Event Received: ${req.body.type}`);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, comment, status } = data;

    const comments = commentsByPostId[postId];
    const matchedComment = comments.find((comment) => {
      return comment.id === id;
    });

    matchedComment.status = status;
    matchedComment.comment = comment;

    axios
      .post("http://event-bus-cluster-ip:6005/events", {
        type: "CommentUpdated",
        data: {
          postId,
          id,
          comment,
          status,
        },
      })
      .catch((err) => console.error(err));
  }

  res.status(200).send({
    success: true,
  });
});

// Port
const port = 4002;
app.listen(port, () => console.log(`Server is listening on ${port}`));
