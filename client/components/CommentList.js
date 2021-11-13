import axios from "axios";
import { useState, useEffect } from "react";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((commentObj) => {
        return <li key={commentObj.id}> {commentObj.comment}</li>;
      })}
    </>
  );
};

export default CommentList;
