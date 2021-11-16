const express = require("express");
const axios = require("axios");

// Create express app
const app = express();

// Body Parser middleware
app.use(express.json());

// eventHandler

const handleEvent = (type, data) => {
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
      .post("http://event-bus-cluster-ip:6005/events", {
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
};

// Routes
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.status(200).send({});
});

// Listening on Port
const port = 4004;
app.listen(port, async () => {
  console.log(`Server is listening on ${port}`);

  try {
    const res = await axios.get("http://event-bus-cluster-ip:6005/events");

    for (let event of res.data) {
      console.log("Processing Event: ", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.error(err);
  }
});
