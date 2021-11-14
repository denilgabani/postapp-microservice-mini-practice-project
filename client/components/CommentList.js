import axios from "axios";
import { useState, useEffect } from "react";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((commentObj) => {
        let content;

        if (commentObj.status === "approved") content = commentObj.comment;
        else if (commentObj.status === "pending")
          content = "Comment is awaiting for moderation";
        else if (commentObj.status === "blocked")
          content = "Comment is blocked";
        return <li key={commentObj.id}> {content}</li>;
      })}
    </>
  );
};

export default CommentList;
