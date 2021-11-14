const express = require("express");
const axios = require("axios");

// Create express app
const app = express();

// Body Parser middleware
app.use(express.json());

// Routes
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { postId, id, comment } = data;

    let status = data.status;

    status = "approved"; // Intially we will take it as approved but if it contains flaggedWord then we will change it to block

    const flaggedWords = ["hate"];
    for (let i = 0; i < flaggedWords.length; i++) {
      if (comment.includes(flaggedWords[i])) {
        status = "blocked";
        break;
      }
    }

    console.log(status);

    axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          postId,
          id,
          comment,
          status,
        },
      })
      .catch((err) => console.error(err));
  }
  res.status(200).send({});
});

// Listening on Port
const port = 4004;
app.listen(port, () => console.log(`Server is listening on ${port}`));
