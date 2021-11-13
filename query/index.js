const express = require("express");
const cors = require("cors");

const app = express();

// Body Parser
app.use(express.json());

// CORS enabled
app.use(cors());

// Data
/** Format
 * [
 * {
 *  id: postId,
 * title: post,
 * comments: [
 * {
 * id: commentId,
 * comment: comment
 * }
 * ],
 *
 * }
 * ]
 *
 */
let posts = [];

// Routes

// Port
const port = 4003;
app.listen(port, () => console.log(`Server is listening on ${port}`));
