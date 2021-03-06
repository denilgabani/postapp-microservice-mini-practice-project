import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    axios
      .get("http://posts.com/posts")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {Object.keys(posts).map((postId) => {
        console.log(posts);
        return (
          <div className="card" key={postId}>
            <h3>{posts[postId].title}</h3>
            <ul>
              <CommentList comments={posts[postId].comments} />
            </ul>
            <CommentCreate postId={postId} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
