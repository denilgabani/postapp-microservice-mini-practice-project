import axios from "axios";
import { useState, useEffect } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4002/posts/${postId}/comments`)
      .then((res) => setComments(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {comments.map((commentObj) => {
        return <li key={commentObj.id}> {commentObj.comment}</li>;
      })}
    </>
  );
};

export default CommentList;
