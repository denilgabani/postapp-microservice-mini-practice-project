import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const sendComment = () => {
    axios
      .post(`http://localhost:4002/posts/${postId}/comments`, {
        content: comment,
      })
      .catch((err) => console.error(err));
    setComment("");
  };

  return (
    <div className="flex-col">
      <label htmlFor="createcomment">Comments </label>
      <input
        type="text"
        id="createcomment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={sendComment}>Submit</button>
    </div>
  );
};

export default CommentCreate;
