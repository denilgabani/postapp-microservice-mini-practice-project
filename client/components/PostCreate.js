const PostCreate = () => {
  const [postTitle, setPostTitle] = useState("");

  const sendData = (e) => {};

  return (
    <div>
      <h3>Create Post</h3>
      <div className="flex-col">
        <label for="createpost">Title</label>
        <input
          type="text"
          id="createpost"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <button onClick={sendData}>Submit</button>
      </div>
    </div>
  );
};

export default PostCreate;
