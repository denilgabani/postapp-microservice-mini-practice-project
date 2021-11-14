const express = require("express");
const cors = require("cors");

const app = express();

// Body Parser
app.use(express.json());

// CORS enabled
app.use(cors());

// Data
/** Format
 * {postId:
 * {
 *  id: postId,
 * title: post,
 * comments: [
 * {
 * id: commentId,
 * comments: comment,
 * status: status of comment
 * }
 * ],
 *
 * }
 * }
 *
 */
let posts = {};

// Routes

app.get("/posts", (req, res) => {
  console.log(posts);
  res.status(200).send({
    success: true,
    data: posts,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { postId, id, comment, status } = data;
    posts[postId].comments.push({ id, comment, status });
  } else if (type === "CommentUpdated") {
    const { postId, id, comment, status } = data;
    const comments = posts[postId].comments;

    const matchedComment = comments.find((comment) => {
      return comment.id === id;
    });

    matchedComment.status = status;
    matchedComment.comment = comment;
  }

  res.status(201).send({
    success: true,
  });
});

// Port
const port = 4003;
app.listen(port, () => console.log(`Server is listening on ${port}`));