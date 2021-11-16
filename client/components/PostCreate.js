import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [postTitle, setPostTitle] = useState("");

  const sendData = (e) => {
    axios
      .post("http://posts.com/posts/create", {
        content: postTitle,
      })
      .catch((err) => console.log(err));
    setPostTitle("");
  };

  return (
    <div>
      <h3>Create Post</h3>
      <div className="flex-col">
        <label htmlFor="createpost">Title</label>
        <input
          type="text"
          id="createpost"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <button onClick={sendData}>Submit</button>
      </div>
    </div>
  );
};

export default PostCreate;
